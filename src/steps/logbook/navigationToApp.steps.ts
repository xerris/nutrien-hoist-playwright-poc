/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ICustomWorld } from '../../support/custom-world';
import { Given, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

Given('I navigate to the logbook app', async function (this: ICustomWorld) {
  console.log('I navigate to the logbook app');
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('http://localhost:4000');

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Logbook app navigation stub completed');
});

Then('I should see title of the app', async function (this: ICustomWorld) {
  const actualTitle = await page.title(); // Fetch the title of the page
  console.log('actualTitle', actualTitle);
  expect(actualTitle).toBeTruthy();
});

Then('I should see header of the app', async function (this: ICustomWorld) {
  const titleElement = page.locator('h4');
  const expectedTitle = 'MineSight Hoist';

  await expect(titleElement).toBeVisible();
  const titleText = await titleElement.textContent();

  if (!titleText?.includes(expectedTitle)) {
    throw new Error(`Expected title "${expectedTitle}" not found. Got "${titleText}"`);
  }
  expect(titleText).toContain(expectedTitle);
});

Then('I should see the email text field', async function () {
  const emailField = page.locator('[data-testid="login-email"]');
  await emailField.waitFor({ state: 'visible' });
  const isVisible = await emailField.isVisible();
  expect(isVisible).toBeTruthy();

  const value = await emailField.inputValue();
  expect(value).toBe(''); // Check for an empty string
});

Then('I should see the password text field', async function () {
  const passwordField = page.locator('[data-testid="login-password"]');
  await passwordField.waitFor({ state: 'visible' });
  const isVisible = await passwordField.isVisible();
  expect(isVisible).toBeTruthy();

  const value = await passwordField.inputValue();
  expect(value).toBe(''); // Check for an empty string
});
