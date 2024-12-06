import { expect } from 'playwright/test';
import { IHoistWorld } from '../../../support/hoist-world';
import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { fillFormField } from '../../../utils/form-helpers';

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

Given('I click on Rope Information Accordion Tab', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.waitForSelector('text=Rope information', { state: 'visible' });

  const accordion = page.getByText('Rope information', { exact: true });
  await expect(accordion).toBeVisible();
  await accordion.click();
});

Given('I provide the required rope information', async function (this: IHoistWorld, dataTable: DataTable) {
  const page = this.page!;
  const ropeData = dataTable.hashes();

  for (const { name, value, type } of ropeData) {
    try {
      await fillFormField(page, { type, name, value: value.toString() });
    } catch (error) {
      console.error(`Error filling field ${name}: ${error}`);
      throw error;
    }
  }
});

Given('I click on Construction Info Accordion Tab', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.waitForSelector('text=Construction info', { state: 'visible' });

  const accordion = page.getByText('Construction info', { exact: true });
  await expect(accordion).toBeVisible();
  await accordion.click();
});

Given('I provide information for construction info form', async function (this: IHoistWorld, dataTable: DataTable) {
  const page = this.page!;
  const ropeData = dataTable.hashes();

  for (const { name, value, type } of ropeData) {
    try {
      await fillFormField(page, { type, name, value: value.toString() });
    } catch (error) {
      console.error(`Error filling field ${name}: ${error}`);
      throw error;
    }
  }
});

Given('I click on Breaking load test Info Accordion Tab', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.waitForSelector('text=Breaking load test info', { state: 'visible' });

  const accordion = page.getByText('Breaking load test info', { exact: true });
  await expect(accordion).toBeVisible();
  await accordion.click();
});

Given('I provide information for Breaking load test info form', async function (this: IHoistWorld, dataTable: DataTable) {
  const page = this.page!;
  const ropeData = dataTable.hashes();

  for (const { name, value, type } of ropeData) {
    try {
      await fillFormField(page, { type, name, value: value.toString() });
    } catch (error) {
      console.error(`Error filling field ${name}: ${error}`);
      throw error;
    }
  }
});

When('I click the save button', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.getByRole('button', { name: 'Save' }).click();
  console.log('Add new rope save button pressed stub completed');
});

Then('I should see the record in the Rope Dashboard', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.waitForSelector('text=Applied:', { state: 'visible' });
  await page.getByRole('gridcell', { name: 'CUCSNO123' }).click();
});
