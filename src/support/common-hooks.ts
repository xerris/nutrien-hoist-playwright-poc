import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import {
  Browser,
  chromium,
  ChromiumBrowser,
  ConsoleMessage,
  firefox,
  FirefoxBrowser,
  request,
  webkit,
  WebKitBrowser,
} from '@playwright/test';
import { ensureDir } from 'fs-extra';

import { SCREENSHOT_DIR } from '../../constants';
import { config } from './config';
import { ILogbookWorld } from './logbook-world';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser | Browser;
const tracesDir = 'traces';

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser | Browser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  // Launch browser only once
  if (!browser) {
    switch (config.browser) {
      case 'firefox':
        browser = await firefox.launch(config.browserOptions);
        break;
      case 'webkit':
        browser = await webkit.launch(config.browserOptions);
        break;
      case 'msedge':
        browser = await chromium.launch({ ...config.browserOptions, channel: 'msedge' });
        break;
      case 'chrome':
        browser = await chromium.launch({ ...config.browserOptions, channel: 'chrome' });
        break;
      default:
        browser = await chromium.launch(config.browserOptions);
    }
  }
  await ensureDir(tracesDir);
});

Before({ tags: '@ignore' }, function () {
  return 'skipped';
});

Before({ tags: '@debug' }, function (this: ILogbookWorld) {
  this.debug = true;
});

Before(async function (this: ILogbookWorld, { pickle }) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: SCREENSHOT_DIR } : undefined,
    viewport: { width: 1200, height: 800 },
    // storageState: USER_FILE,
  });
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: config.BASE_API_URL,
  });

  // Disable session storage for now
  // const sessionStorage = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf-8'));
  // await this.context.addInitScript((storage: Record<string, unknown> | ArrayLike<unknown>) => {
  //   // TODO: This should come from a config file
  //   if (window.location.hostname === 'dev-hoist.minesight.nutrien.com') {
  //     for (const [key, value] of Object.entries(storage))
  //       window.sessionStorage.setItem(key, value as string);
  //   }
  // }, sessionStorage);

  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'log') {
      this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

After(async function (this: ILogbookWorld, { result }) {
  if (result) {
    this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();

      // Replace : with _ because colons aren't allowed in Windows paths
      const timePart = this.startTime?.toISOString().split('.')[0].replaceAll(':', '_');

      if (image) {
        this.attach(image, 'image/png');
      }
      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${timePart}trace.zip`,
      });
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
