import { expect } from 'playwright/test';
import { IHoistWorld } from '../../../support/hoist-world';
import { DataTable, Given, Then, When } from '@cucumber/cucumber';

Given('I press the Add records button', async function (this: IHoistWorld) {
  const page = this.page!;
  // await page.getByRole('button', { name: 'Add records' }).click();
  await page.waitForSelector('text=Applied:', { state: 'visible' }); // making sure ag-grid table is rendered
  const text = page.getByText('Add records', { exact: true });

  // Assert that the button is visible
  await expect(text).toBeVisible();
  await text.click();
});

Then('I select the Add new rope button', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.waitForSelector('text=Add new rope', { state: 'visible' });
  const addNewRope = page.getByText('Add new rope', { exact: true });

  await expect(addNewRope).toBeVisible();
  await addNewRope.click();
});

Then('I should see the Add new rope data Side Panel', async function (this: IHoistWorld) {
  const page = this.page!;
  const sidePanelTitle = page.getByRole('heading', { name: 'Add new rope data' });
  await expect(sidePanelTitle).toBeVisible();
});

Given('I provide the following rope information', async function (dataTable: DataTable) {
  console.log('I provide the following rope information');
  console.log(`baseUrl: ${this.baseUrl}`);

  const ropeInfo = dataTable.rowsHash();

  for (const [field, value] of Object.entries(ropeInfo)) {
    console.log(`Field: ${field}, Value: ${value}`);
    // Use the field and value as needed, e.g., to fill in form fields
    console.log(`await this.page.fill('#${field}', '${value}');`);
  }

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Rope data information stub completed');
});

When('I press the Add new rope save button', async function (this: IHoistWorld) {
  console.log('I press the Add new rope save button');
  console.log(`baseUrl: ${this.baseUrl}`);

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Add new rope save button pressed stub completed');
});

Then('I should receive a success message', async function (this: IHoistWorld) {
  console.log('I should receive a success message');
  console.log(`baseUrl: ${this.baseUrl}`);

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('I should receive a success message stub completed');
});
