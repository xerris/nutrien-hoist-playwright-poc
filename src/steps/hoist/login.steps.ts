import { IHoistWorld } from '../../support/hoist-world';
import { Given, Then, When } from '@cucumber/cucumber';

import { Browser, Page, chromium } from '@playwright/test';

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
  await page.locator('#i0116').click();
  await page.locator('#i0116').fill('some.example@nutrien.com');
  await page.getByRole('button', { name: 'Next' }).click();
});

When('I enter the password in the password field', async function (this: IHoistWorld) {
  await page.locator('#i0118').click();
  await page.locator('#i0118').fill('***************');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('button', { name: 'Yes' }).click();
  console.log('Login stub completed');
});

Then('I should be redirected to the actions page', async function (this: IHoistWorld) {
  await Promise.resolve();
  console.log('I should be redirected to the actions page stub completed');
});

Given('I am logged in as a site-admin', async function (this: IHoistWorld) {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://dev.minesight.nutrien.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await Promise.resolve();
  await page.locator('#i0116').click();
  await page.locator('#i0116').fill('gitesh.gupta@nutrien.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#i0118').click();
  await page.locator('#i0118').fill('000pure99%sweetchilly');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForSelector('text=Rope record', { state: 'visible' });
});
