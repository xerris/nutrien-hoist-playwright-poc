import { Given, Then, When } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { IHoistWorld } from '../support/hoist-world';

let browser: Browser;
let page: Page;

Given('I login as a Lanigan site-admin', async function (this: IHoistWorld) {
  await Promise.resolve();
  console.log('Login stub completed');
});

Given('I am on the login page in the DEV env', async function (this: IHoistWorld) {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://dev.minesight.nutrien.com');
});

Given('I click on the login button', async function (this: IHoistWorld) {
  await page.getByRole('button', { name: 'Login' }).click();
  await Promise.resolve();
});

When('I enter the email in the email field', async function (this: IHoistWorld) {
  const emailField = page.locator('#i0116');
  await emailField.click();
  await emailField.fill(this.envConfig.credentials.username);
  await page.getByRole('button', { name: 'Next' }).click();
});

When('I enter the password in the password field', async function (this: IHoistWorld) {
  await page.locator('#i0118').click();
  await page.locator('#i0118').fill(this.envConfig.credentials?.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('button', { name: 'Yes' }).click();
  console.log('Login stub completed');
});

Then('I should be redirected to the actions page', async function (this: IHoistWorld) {
  await Promise.resolve();
  console.log('I should be redirected to the actions page stub completed');
});

Given('I am logged in as a site-admin', async function (this: IHoistWorld) {
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.navigate(this.baseUrl);
  await loginPage.clickLogin();
  await loginPage.enterUsername(this.envConfig.credentials?.username);
  await loginPage.enterPassword(this.envConfig.credentials?.password);
  await loginPage.submit();
  await loginPage.confirmLogin();
  await loginPage.waitForSuccessfulLogin();

  this.browser = browser;
  this.context = await browser.newContext();
  this.page = page;
  this.cookies = await this.context.cookies();
});
