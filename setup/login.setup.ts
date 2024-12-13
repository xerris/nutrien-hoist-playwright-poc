import { test as setup } from '@playwright/test';
import fs from 'fs';
import * as OTPAuth from 'otpauth';

import { SESSION_FILE, USER_FILE } from '../constants';

/**
 * Login to Microsoft 365
 * More info: https://playwright.dev/docs/auth
 */

setup('authenticate', async ({ page }) => {
  // 1. Open the login page
  await page.goto(process.env.LOOGBOOK_PAGE_URL ?? 'https://dev-hoist.minesight.nutrien.com');

  // await page.getByRole('button', { name: 'Login' }).click();

  // 2. Enter the email address
  await page.getByTestId('login-email').click();
  await page.getByTestId('login-email').fill(process.env.LOGBOOK_USERNAME ?? '');

  await page.getByTestId('login-password').click();
  await page.getByTestId('login-password').fill(process.env.LOGBOOK_PASSWORD ?? '');

  await page.getByTestId('login-btn').click();

  await page.waitForSelector('text=iPad assignment', { state: 'visible' });
  await page.waitForURL('https://dev-hoist.minesight.nutrien.com/home');

  await page.context().storageState({ path: USER_FILE });

  await page.getByRole('img').click();
  await page.getByRole('option', { name: 'Rocanville' }).click();
  await page.getByRole('button', { name: 'Assign iPad' }).click();

  await page.waitForSelector('text=MineSight Hoist', { state: 'visible' });
  await page.waitForURL('https://dev-hoist.minesight.nutrien.com/initializing');

  const sessionStorage = await page.evaluate((): string => JSON.stringify(sessionStorage));
  fs.writeFileSync(SESSION_FILE, sessionStorage, 'utf-8');
});
