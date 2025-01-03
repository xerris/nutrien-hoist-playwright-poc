import { Given } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { expect } from 'playwright/test';

import { SCREENSHOT_DIR } from '../../constants';
import { HoistWorld, IHoistWorld } from '../support/hoist-world';

async function filterRopesByStatus(page: Page, status?: string) {
  const statusHeader = page.locator('.ag-cell-label-container').filter({ hasText: 'Status' });
  await statusHeader.locator('.menu-icon').click();

  try {
    if (status) {
      await page.getByLabel('(Select All)').uncheck();
      await page.getByLabel(status).check();
    } else {
      await page.getByLabel('(Select All)').check();
    }
  } catch (error) {
    if (
      error instanceof Error
      && error.message.includes('Clicking the checkbox did not change its state')
    ) {
      // Ignore the "did not change its state" error
      return;
    }
    throw error;
  }
}

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

    try {
      await page
        .getByRole('gridcell', { name: serialNumber, exact: true })
        .click({ timeout: 5000 });
    } catch {
      console.log(
        `Rope ${serialNumber} not found as 'In Service' or 'Spare' rope - expanding search to check all status types (In Service, Spare, and Retired)...`,
      );

      await filterRopesByStatus(page); // select all status

      try {
        await page
          .getByRole('gridcell', { name: serialNumber, exact: true })
          .click({ timeout: 5000 });
      } catch {
        throw new Error(
          `Rope not found - please check if serial number ${serialNumber} is correct`,
        );
      }
    }

    const text = page.getByText('Rope record details', { exact: true });
    await expect(text).toBeVisible();
  },
);

Given(
  /^I navigate to the Rope Detail Page for an In Service rope(?:\s+with Serial number '([^']*)')?$/,
  async function (this: IHoistWorld, serialNumber: string) {
    const page = this.page!;
    await filterRopesByStatus(page, 'In Service');
    console.log(`Searching for In Service rope: ${serialNumber}`);

    if (serialNumber) {
      console.log(`Searching for In Service rope: ${serialNumber}`);
      try {
        await page
          .getByRole('gridcell', { name: serialNumber, exact: true })
          .click({ timeout: 5000 });
        await expect(page.getByText('Rope record details', { exact: true })).toBeVisible();
        return;
      } catch {
        console.log(
          `Rope ${serialNumber} not found. Clicking first available in-service rope instead.`,
        );
      }
    }

    // click first In Service rope if either Serial Number is not provided or found
    try {
      await page.locator('.ag-row-first .ag-cell').first().click({ timeout: 5000 });
    } catch {
      throw new Error('No in-service ropes found in the system');
    }

    await expect(page.getByText('Rope record details', { exact: true })).toBeVisible();
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
