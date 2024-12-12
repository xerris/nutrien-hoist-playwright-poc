import { Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(url: string): Promise<this> {
    await this.page.goto(url);
    return this;
  }

  public async enterUsername(username: string): Promise<this> {
    await this.page.getByTestId('login-email').click();
    await this.page.getByTestId('login-email').fill(username);

    // await this.page.locator('#i0116').fill(username);
    // await this.page.getByRole('button', { name: 'Next' }).click();
    return this;
  }

  public async enterPassword(password: string): Promise<this> {
    await this.page.getByTestId('login-password').click();
    await this.page.getByTestId('login-password').fill(password);

    // await this.page.locator('#i0118').fill(password);
    return this;
  }

  public async submit(): Promise<this> {
    await this.page.getByTestId('login-btn').click();

    // await this.page.getByRole('button', { name: 'Sign in' }).click();
    return this;
  }

  public async selectSite(): Promise<this> {
    await Promise.resolve();
    await this.page.getByRole('img').click();
    await this.page.getByRole('option', { name: 'Rocanville' }).click();
    await this.page.getByRole('button', { name: 'Assign iPad' }).click();

    await this.page.waitForSelector('text=MineSight Hoist', { state: 'visible' });
    await this.page.waitForURL('https://dev-hoist.minesight.nutrien.com/initializing');

    console.log('site selection completed');
    return this;
  }

  public async waitForSuccessfulLogin(): Promise<this> {
    await this.page.waitForSelector('text=iPad assignment', { state: 'visible' });
    await this.page.waitForURL('https://dev-hoist.minesight.nutrien.com/home');
    return this;
  }
}
