import { DataTable, Given, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';

import { IHoistWorld } from '@/support/hoist-world';

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
