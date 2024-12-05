import { expect } from 'playwright/test';
import { IHoistWorld } from '../../support/hoist-world';
import { Given } from '@cucumber/cucumber';

Given('I navigate to the Rope record page', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.goto('https://dev.minesight.nutrien.com/hoist/ropes');
  console.log('Current url:', page.url());
  expect(page.url()).toBe('https://dev.minesight.nutrien.com/hoist/ropes');
  await Promise.resolve();
});
