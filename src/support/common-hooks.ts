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
import fs, { ensureDir } from 'fs-extra';

import { AUTH_FILE, SESSION_FILE, TRACES_DIR } from '../../constants';
import { config } from './config';
import { IHoistWorld } from './hoist-world';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser | Browser;

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
  await ensureDir(TRACES_DIR);
});

Before({ tags: '@ignore' }, function () {
  return 'skipped';
});

Before({ tags: '@debug' }, function (this: IHoistWorld) {
  this.debug = true;
});

Before(async function (this: IHoistWorld, { pickle }) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    viewport: { width: 1200, height: 800 },
    storageState: AUTH_FILE,
  });
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: config.BASE_API_URL,
  });

  const sessionStorage = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf-8'));
  await this.context.addInitScript((storage: Record<string, unknown> | ArrayLike<unknown>) => {
    if (window.location.hostname === 'dev.minesight.nutrien.com') {
      for (const [key, value] of Object.entries(storage))
        window.sessionStorage.setItem(key, value as string);
    }
  }, sessionStorage);

  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'log') {
      this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

After(async function (this: IHoistWorld, { result }) {
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
        path: `${TRACES_DIR}/${this.testName}-${timePart}trace.zip`,
      });
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
