import { test as setup } from '@playwright/test';
import fs from 'fs';
import * as OTPAuth from 'otpauth';

import { AUTH_FILE, SESSION_FILE } from '../constants';

/**
 * Login to Microsoft 365
 * More info: https://playwright.dev/docs/auth
 */

setup('authenticate', async ({ page }) => {
  // 1. Open the login page
  await page.goto(process.env.HOIST_PAGE_URL ?? 'https://dev.minesight.nutrien.com');

  await page.getByRole('button', { name: 'Login' }).click();

  // 2. Enter the email address
  const emailInput = page.locator('input[type=email]');
  await emailInput.click();
  await emailInput.fill(process.env.HOIST_USERNAME ?? '');

  // 3. Click on the "Next" button
  await page.getByRole('button', { name: 'Next' }).click();

  // 4. Enter the password
  const passwordInput = page.locator('input[type=password]');
  await passwordInput.click();
  await passwordInput.fill(process.env.HOIST_PASSWORD ?? '');

  // 5. Click on the "Sign in" button
  await page.locator('input[type=submit]').click();

  // ---- temp workaround for the purpose of writing tests ----
  // await page.getByRole('link', { name: 'I can\'t use my Outlook mobile' }).click();
  // await page.getByRole('button', { name: 'Use a verification code' }).click();
  // await page.getByPlaceholder('Code').click();
  // await page.getByPlaceholder('Code').fill(process.env.HOIST_OTP_SECRET);
  // await page.getByRole('button', { name: 'Verify' }).click();
  // --------------------------

  // 6. Check if the account has the Microsoft Authenticator app configured
  // const otherWayLink = page.locator('a#signInAnotherWay');
  // await otherWayLink.waitFor({ timeout: 2000 });
  // if (await otherWayLink.isVisible()) {
  //   // Select the TOTP option
  //   await otherWayLink.click();
  //
  //   const otpLink = page.locator(`div[data-value="PhoneAppOTP"]`);
  //   await otpLink.click();
  // }

  // 7. Enter the TOTP code
  const otpInput = await page.waitForSelector('input#idTxtBx_SAOTCC_OTC');
  const totp = new OTPAuth.TOTP({
    issuer: 'Microsoft',
    label: process.env.HOIST_USERNAME,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: process.env.HOIST_OTP_SECRET,
  });

  const code = totp.generate();
  await otpInput.fill(code);

  // 8. Click on the "Next" button
  await page.locator('input[type=submit]').click();

  // 9. Click on the "Yes" button to stay signed in
  await page.locator('input[type=submit][value="Yes"]').click();

  try {
    await page.getByRole('button', { name: 'Hoist' }).click();
  } catch (error) {
    console.log('Error:', error);
  }
  await page.waitForURL('**/dev.minesight.nutrien.com/hoist/actionitems');

  await page.context().storageState({ path: AUTH_FILE });

  const sessionStorage = await page.evaluate((): string => JSON.stringify(sessionStorage));
  fs.writeFileSync(SESSION_FILE, sessionStorage, 'utf-8');
});
