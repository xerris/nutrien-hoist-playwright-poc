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
}
