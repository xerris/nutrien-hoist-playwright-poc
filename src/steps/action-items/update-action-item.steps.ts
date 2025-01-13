import { DataTable, Given, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';

import { ActionItems } from '@/pages/ActionItems';
import { IHoistWorld } from '@/support/hoist-world';

Then('I can see Hoist and shaft action items text', async function (this: IHoistWorld) {
  const page = this.page!;
  await expect(page.getByText('Hoist and shaft action items')).toBeVisible();
});

Given(
  'I edit the action item details with the following information',
  async function (this: IHoistWorld, dataTable: DataTable): Promise<void> {
    const page = this.page!;
    const actionItemInfo = dataTable.rowsHash();
    const actionItem = new ActionItems(page);
    await actionItem.editActionItem();

    for (const [fieldName, value] of Object.entries(actionItemInfo)) {
      await actionItem.setFieldValue(fieldName, value);
    }
  },
);

Then(
  'I should be able to see the updated Action item with {string}',
  async function (this: IHoistWorld, expectedValue: string) {
    const page = this.page!;
    // wait for success notification
    await page.getByText('Action Item updated.').waitFor({ state: 'visible' });

    await expect(page.getByRole('dialog')).toContainText(expectedValue);

    console.log(`Found element with text: ${expectedValue}`);
  },
);
