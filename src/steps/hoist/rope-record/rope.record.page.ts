import { IHoistWorld } from '../../../support/hoist-world';
import { DataTable, Given, Then, When } from '@cucumber/cucumber';

Given('I press the Add records button', async function (this: IHoistWorld) {
  console.log('I press the Add records button');
  console.log(`baseUrl: ${this.baseUrl}`);

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Add records button pressed stub completed');
});

Given('I select the Add new rope button', async function (this: IHoistWorld) {
  console.log('I select the Add new rope button');
  console.log(`baseUrl: ${this.baseUrl}`);

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Add new rope button pressed stub completed');
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
