import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'playwright/test';

import { CreateRopeRecord } from '../../../pages/CreateRopeRecord';
import { IHoistWorld } from '../../../support/hoist-world';

Then(
  'the following sections should be visible:',
  async function (this: IHoistWorld, headersTable: DataTable) {
    const headers = headersTable.raw().flat();
    for (const Header of headers) {
      const header = this.page?.getByRole('heading', { name: Header });
      if (header) {
        await expect(header).toBeVisible();
      }
    }
  },
);

Given('I click on the {string} tab', async function (this: IHoistWorld, tabName: string) {
  await this.page?.getByRole('tab', { name: tabName }).click();
});

When(
  'I provide the following information in the Breaking load form',
  async function (this: IHoistWorld, breakingLoadInfo: DataTable) {
    await this.page?.getByTestId('edit-button').first().click();
    const ropeRecord = new CreateRopeRecord(this.page!);
    const breakingLoadData = breakingLoadInfo.rowsHash();
    for (const [fieldName, value] of Object.entries(breakingLoadData)) {
      await ropeRecord.setFieldValue(fieldName, value);
    }
    await this.page?.getByRole('button', { name: 'Save' }).click();
  },
);

Then('I should be able to see the updated Breaking load data', async function (this: IHoistWorld) {
  const expectedValue = '4.00 kg';
  const valueLocator = this.page
    ?.locator('div')
    .filter({ hasText: new RegExp(`^${expectedValue}$`) });
  await valueLocator?.click();
  console.log(`Value is updated correctly`);
});
