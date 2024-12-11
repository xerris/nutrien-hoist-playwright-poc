import { Page } from '@playwright/test';
import * as OTPAuth from 'otpauth';
import dotenv from 'dotenv';
export const AUTH_FILE = '.auth/user.json';

if (!process.env.CI) {
  dotenv.config({ path: '.env' });
}

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(url: string): Promise<this> {
    await this.page.goto(url);
    return this;
  }

  public async clickLogin(): Promise<this> {
    await this.page.getByRole('button', { name: 'Login' }).click();
    return this;
  }

  public async enterUsername(username: string): Promise<this> {
    await this.page.locator('#i0116').fill(username);
    await this.page.getByRole('button', { name: 'Next' }).click();
    return this;
  }

  public async enterPassword(password: string): Promise<this> {
    await this.page.locator('#i0118').fill(password);
    return this;
  }

  public async submit(): Promise<this> {
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    return this;
  }

  public async confirmLogin(): Promise<this> {
    await this.page.getByRole('button', { name: 'Yes' }).click();
    return this;
  }

  public async waitForSuccessfulLogin(): Promise<this> {
    await this.page.waitForSelector('text=Rope record', { state: 'visible' });
    await this.page.waitForURL('https://dev.minesight.nutrien.com/hoist/actionitems');
    return this;
  }

  public async doLogin(): Promise<this> {
    // 1. Open the login page
    await this.page.goto(process.env.HOIST_PAGE_URL ?? 'https://dev.minesight.nutrien.com');

    await this.page.getByRole('button', { name: 'Login' }).click();

    // 2. Enter the email address
    const emailInput = this.page.locator('input[type=email]');
    await emailInput.click();
    await emailInput.fill(process.env.HOIST_USERNAME ?? '');

    // 3. Click on the "Next" button
    await this.page.getByRole('button', { name: 'Next' }).click();

    // 4. Enter the password
    const passwordInput = this.page.locator('input[type=password]');
    await passwordInput.click();
    await passwordInput.fill(process.env.HOIST_PASSWORD ?? '');

    // 5. Click on the "Sign in" button
    await this.page.locator('input[type=submit]').click();

    // 6. Check if the account has the Microsoft Authenticator app configured
    // const otherWayLink = page.locator('a#signInAnotherWay');
    // await otherWayLink.waitFor({ timeout: 2000 });
    // if (await otherWayLink.isVisible()) {
    //   // Select the TOTP option
    //   await otherWayLink.click();

    //   const otpLink = page.locator(`div[data-value="PhoneAppOTP"]`);
    //   await otpLink.click();
    // }

    // 7. Enter the TOTP code
    const otpInput = await this.page.waitForSelector('input#idTxtBx_SAOTCC_OTC');
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
    await this.page.locator('input[type=submit]').click();

    // 9. Click on the "Yes" button to stay signed in
    await this.page.locator('input[type=submit][value="Yes"]').click();

    // await this.page.waitForURL('**/dev.minesight.nutrien.com/app-dashboard/**');
    try {
      await this.page.getByRole('button', { name: 'Hoist' }).click();
    } catch (error) {
      console.log('Error:', error);
    }
    // await this.page.context().storageState({ path: AUTH_FILE });

    // const sessionStorage = await page.evaluate((): string => JSON.stringify(sessionStorage));
    // fs.writeFileSync('.auth/session.json', sessionStorage, 'utf-8');
    return this;
  }
}
