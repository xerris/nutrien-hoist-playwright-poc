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

Given('I navigate to the Rope Detail Page for Serial number {string}', async function (this: IHoistWorld, serialNumber: string) {
  const page = this.page!;
  console.log('Searching for:', serialNumber);
  await page.getByRole('gridcell', { name: serialNumber, exact: true }).click();
  const text = page.getByText('Rope record details', { exact: true });
  await expect(text).toBeVisible();
});

Given('I navigate to the Rope Detail Page for a {string} rope', async function (this: IHoistWorld, status: string) {
  const page = this.page!;
  await page.getByRole('gridcell', { name: 'status' }).click();
  const text = page.getByText('Rope record details', { exact: true });
  await expect(text).toBeVisible();
});

//  await page.getByRole('gridcell', { name: 'status' }).click();
