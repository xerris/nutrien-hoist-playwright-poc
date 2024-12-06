import { expect } from 'playwright/test';
import { IHoistWorld } from '../../../support/hoist-world';
import { Given, Then, When } from '@cucumber/cucumber';

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

Given('I click on Rope Information Accordian Tab', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.waitForSelector('text=Rope information', { state: 'visible' });

  const accordion = page.getByText('Rope information', { exact: true });
  await expect(accordion).toBeVisible();
  await accordion.click();
});

Given('I provide the required rope information', async function (this: IHoistWorld) {
  const page = this.page!;

  const ropeMetadata = [
    { name: 'Rope Type', locator: '[id="Rope\\ type"]', type: 'select', value: 'Head rope' },
    { name: 'Hoist #', locator: '[id="Hoist\\ \\#"]', type: 'select', value: '1' },
    { name: 'Serial number', locator: 'Serial number', type: 'input', value: 'CUCSNO123' },
    { name: 'Diameter of rope (optional)', locator: 'Diameter of rope (optional)', type: 'input', value: '1234' },
    { name: 'Weight of rope', locator: 'Weight of rope', type: 'input', value: '123' },
    { name: 'Construction of rope', locator: 'Construction of rope', type: 'input', value: 'abcd1234' },
    { name: 'Type of lay', locator: '[id="Type\\ of\\ lay"]', type: 'select', value: 'Right lay' },
    { name: 'Grade of steel', locator: 'Grade of steel', type: 'input', value: '1234' },
    { name: 'Manufacturer name', locator: 'Manufacturer name', type: 'input', value: 'gitesh' },
    { name: 'Manufacturer address', locator: 'Manufacturer address', type: 'input', value: 'India' },
    { name: 'Manufacture date', locator: 'Manufacture date', type: 'date', value: '6' }
  ];

  for (const field of ropeMetadata) {
    switch (field.type) {
      case 'select':
        // Open dropdown and select option
        await page.locator(field.locator).click();
        await page.getByRole('option', { name: field.value }).click();
        break;

      case 'input':
        // Fill input field
        await page.getByRole('textbox', { name: field.locator }).click();
        await page.getByRole('textbox', { name: field.locator }).fill(field.value);
        break;

      case 'date':
        // Select date
        await page.getByRole('textbox', { name: field.locator }).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        break;

      default:
        throw new Error(`Unsupported field type: ${field.type}`);
    }
  }
});

Given('I click on Construction Info Accordian Tab', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.waitForSelector('text=Construction info', { state: 'visible' });

  const accordion = page.getByText('Construction info', { exact: true });
  await expect(accordion).toBeVisible();
  await accordion.click();
});

Given('I Provide information for construction info form', async function (this: IHoistWorld) {
  const page = this.page!;

  const constructionInfoMetaData = [
    { name: 'Class of core used in the rope', locator: 'Class of core used in the rope', type: 'input', value: '123' },
    { name: 'Number of strands in the rope', locator: 'Number of strands in the rope', type: 'input', value: '12' },
    { name: 'Number of wires in each strand', locator: 'Number of wires in each strand', type: 'input', value: '12' },
    { name: 'Diameter of wires', locator: 'Diameter of wires', type: 'input', value: '12.1222' },
    { name: 'Breaking stress of steel', locator: 'Breaking stress of steel', type: 'input', value: '123' },
    { name: 'Standard torsion test of the', locator: 'Standard torsion test of the', type: 'input', value: '23' },
    { name: 'The percentage by mass of', locator: 'The percentage by mass of', type: 'input', value: '12' },
    { name: 'The trade name of the', locator: 'The trade name of the', type: 'input', value: 'unknown' }
  ];

  for (const field of constructionInfoMetaData) {
    switch (field.type) {
      case 'input':
        // Fill input field
        await page.getByRole('textbox', { name: field.locator }).click();
        await page.getByRole('textbox', { name: field.locator }).fill(field.value);
        break;

      default:
        throw new Error(`Unsupported field type: ${field.type}`);
    }
  }
});

Given('I click on Breaking load test Info Accordian Tab', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.waitForSelector('text=Breaking load test info', { state: 'visible' });

  const accordion = page.getByText('Breaking load test info', { exact: true });
  await expect(accordion).toBeVisible();
  await accordion.click();
});

Given('I Provide information for Breaking load test info form', async function (this: IHoistWorld) {
  const page = this.page!;

  const breakingLoadMetadata = [
    { name: 'Breaking load', locator: 'Breaking load', type: 'input', value: '234' },
    { name: 'Test number', locator: 'Test number', type: 'input', value: '12' },
    { name: 'Test date', locator: 'Test date', type: 'date', value: '6' } // Using '6' as the button to click for date selection
  ];

  for (const field of breakingLoadMetadata) {
    switch (field.type) {
      case 'input':
        // Fill input field
        await page.getByRole('textbox', { name: field.locator }).click();
        await page.getByRole('textbox', { name: field.locator }).fill(field.value);
        break;

      case 'date':
        // Handle date field
        await page.getByRole('textbox', { name: field.locator }).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        break;

      default:
        throw new Error(`Unsupported field type: ${field.type}`);
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
