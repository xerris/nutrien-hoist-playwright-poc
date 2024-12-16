import { Given } from '@cucumber/cucumber';
import { expect } from 'playwright/test';

import { SCREENSHOT_DIR } from '../../constants';
import { HoistWorld, IHoistWorld } from '../support/hoist-world';

Given('I navigate to the Rope record page', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.goto('https://dev.minesight.nutrien.com/hoist/ropes');
  console.log('Current url:', page.url());
  expect(page.url()).toBe('https://dev.minesight.nutrien.com/hoist/ropes');
  await Promise.resolve();
});

Given(
  'I navigate to the Rope Detail Page for Serial number {string}',
  async function (this: IHoistWorld, serialNumber: string) {
    const page = this.page!;
    console.log('Searching for:', serialNumber);
    await page.getByRole('gridcell', { name: serialNumber, exact: true }).click();
    const text = page.getByText('Rope record details', { exact: true });
    await expect(text).toBeVisible();
  },
);

Given('I navigate to the Rope Detail Page for a {string} rope', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.getByRole('gridcell', { name: 'status' }).click();
  const text = page.getByText('Rope record details', { exact: true });
  await expect(text).toBeVisible();
});

Given(
  'I should be able to navigate to the Rope Detail Page for created rope',
  async function (this: IHoistWorld) {
    const page = this.page!;
    const serialNumber = HoistWorld.sharedState.generatedSerialNumber;
    console.log('Searching for:', serialNumber);
    await page.getByRole('gridcell', { name: serialNumber, exact: true }).click();
    const text = page.getByText('Rope record details', { exact: true });
    await expect(text).toBeVisible();
    await this.page?.screenshot({
      path: `${SCREENSHOT_DIR}/new-rope-detail-page.png`,
      fullPage: true,
    });
    console.log('Rope record successfully created.');
  },
);

Given(
  'I navigate to an action item reported on {string}',
  async function (this: IHoistWorld, reportedAt: string) {
    const page = this.page!;
    console.log('Searching for:', reportedAt);
    const gridCell = page.getByRole('gridcell', { name: reportedAt, exact: true });
    await gridCell.waitFor({ state: 'visible' });
    await gridCell.click();
    const text = page.getByText('Action item details', { exact: true });
    await expect(text).toBeVisible({ timeout: 60000 });
  },
);

Given('I navigate to the first action item', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.locator('.ag-row-no-focus > div:nth-child(2)').first().click();
  const text = page.getByText('Action item details', { exact: true });
  await expect(text).toBeVisible({ timeout: 0 });
});

Given('I navigate to the Action Items page', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.goto('https://dev.minesight.nutrien.com/hoist/actionItems');
  console.log('Current url:', page.url());
  expect(page.url()).toBe('https://dev.minesight.nutrien.com/hoist/actionItems');
  await page.getByText('Applied:').click({
    timeout: 0,
    trial: true,
  });

  await Promise.resolve();
});
