import { IHoistWorld } from '../support/hoist-world';
import { config } from '../support/config';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('Go to the playwright website', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL);
  await page.locator('nav >> a >> text="Playwright"').waitFor();
});

When('Change theme to {string} mode', async function (this: IHoistWorld, mode: string) {
  const page = this.page!;
  const html = page.locator('html');
  const current = await html.getAttribute('data-theme');
  if (current !== mode) {
    await page.locator('nav >> button[title*="dark and light mode"]').click();
  }
  await page.locator(`html[data-theme=${mode}]`).waitFor();
});

Then('We see {string} mode', async function (this: IHoistWorld, mode: string) {
  const page = this.page!;
  await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
});
