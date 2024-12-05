import { IHoistWorld } from '../../support/hoist-world';
import { Given, Then, When } from '@cucumber/cucumber';

Given('I login as a Lanigan site-admin', async function (this: IHoistWorld) {
  console.log('I login as a Lanigan site-admin');
  console.log(`baseUrl: ${this.baseUrl}`);

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Login stub completed');
});

Given('I am on the login page in the DEV env', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.goto('https://dev.minesight.nutrien.com/');
  console.log('Login stub DEV env completed');
});

Given('I click on the login button', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.getByRole('button', { name: 'Login' }).click();
  await Promise.resolve();
  console.log('Login button clicked');
});

When('I enter the email \'maheak.mishra@nutrien.com\' in the email field', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.getByPlaceholder('someone@example.com').click();
  await page.getByPlaceholder('someone@example.com').fill('maheak.mishra@nutrien.com');
  await page.getByPlaceholder('someone@example.com').press('Enter');
});

When('I enter the password \'password\' in the password field', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  console.log('Login stub completed');
});

Then('I should be redirected to the actions page',  function (this: IHoistWorld) {
  const page = this.page!;
  console.log(page);
  console.log('I should be redirected to the actions page stub completed');
});


