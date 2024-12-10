import { DataTable, Given, When } from '@cucumber/cucumber';

import { ILogbookWorld } from '../../../support/logbook-world';
import { CreateActionItem } from '../../../pages/Logbook/CreateNewActionItem';

Given('I create a new Action Item', async function (this: ILogbookWorld) {
  const page = this.page!;
  const newActionItem = new CreateActionItem(page);

  await newActionItem.addNewActionItem();
});

Given(
  'I provide the following Action Item information',
  async function (this: ILogbookWorld, dataTable: DataTable): Promise<void> {
    const page = this.page!;
    const actionEntities = dataTable.rowsHash();
    const actionItem = new CreateActionItem(page);

    for (const [fieldName, value] of Object.entries(actionEntities)) {
      await actionItem.setFieldValue(fieldName, value);
    }
    await executeWithDelay();
  }
);

// Define the sleep function
async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage of the sleep function
async function executeWithDelay() {
  console.log('Taking a break');
  await sleep(5000); // Pause for 5 seconds
  console.log('Done');
}

When('I click on Save in Action Item form', async function (this: ILogbookWorld) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testName = this.testName ?? 'unknown';

  const screenshotPath = `screenshots/features/${testName}/before-save-${timestamp}.png`;

  await this.page?.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  await this.page?.getByRole('button', { name: 'Save' }).click();
});
