import { Given, Then, When } from '@cucumber/cucumber';
import { Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ILogbookWorld } from '../support/logbook-world';

let page: Page;

Given('I login as a Minesight user in logbook', async function (this: ILogbookWorld) {
  await Promise.resolve();
  console.log('Login stub completed');
});

Given(
  'Given I am on the login page of Logbook in the DEV env',
  async function (this: ILogbookWorld) {
    await this.page!.goto('https://dev-hoist.minesight.nutrien.com');
  },
);

When('I enter the email in the email field', async function (this: ILogbookWorld) {
  const emailField = page.getByTestId('login-email');
  await emailField.click();

  await emailField.fill(this.envConfig.credentials?.username ?? '');
});

When('I enter the password in the password field', async function (this: ILogbookWorld) {
  await page.getByTestId('login-password').click();
  await page.getByTestId('login-password').fill(this.envConfig.credentials?.password ?? '');

  await page.getByRole('button', { name: 'Yes' }).click();
  console.log('Login stub completed');
});

When('I click the login button', async function (this: ILogbookWorld) {
  await page.getByTestId('login-btn').click();
  console.log('Login stub completed');
});

Then('I should be redirected to the Home screen', async function (this: ILogbookWorld) {
  await Promise.resolve();
  console.log('I should be redirected to the actions page stub completed');
});

Given('I am logged in as a Minesight test user', async function (this: ILogbookWorld) {
  const loginPage = new LoginPage(this.page!);

  await loginPage.navigate(this.baseUrl);
  await loginPage.enterUsername(this.envConfig.credentials?.username ?? '');
  await loginPage.enterPassword(this.envConfig.credentials?.password ?? '');
  await loginPage.submit();
  await loginPage.waitForSuccessfulLogin();
  await loginPage.selectSite();
});
