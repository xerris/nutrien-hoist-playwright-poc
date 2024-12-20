import { DataTable, Given, Then, When } from '@cucumber/cucumber';

import { SCREENSHOT_DIR } from '../../../../constants';
import { CreateRopeRecord } from '../../../pages/CreateRopeRecord';
import { HoistWorld, IHoistWorld } from '../../../support/hoist-world';
import { UniqueIdentifierGenerator } from '../../../support/UniqueIdentifierGenerator';

Given('I add a new rope', async function (this: IHoistWorld) {
  const createRopeRecord = new CreateRopeRecord(this.page!);
  await createRopeRecord.addNewRope();
});

Given(
  'I provide the following rope information with {string} serial number',
  async function (this: IHoistWorld, serialNumberType: string, dataTable: DataTable): Promise<void> {
    const ropeInfo = dataTable.rowsHash(); // Convert Gherkin table to object
    const ropeRecord = new CreateRopeRecord(this.page!);

    // Generating unique serial and caching it
    if (serialNumberType === 'Unique') {
      const uniqueSerialNumber = new UniqueIdentifierGenerator().generateUniqueValue('CUCSNO', 6);
      ropeInfo['Serial number'] = uniqueSerialNumber;
      this.generatedSerialNumber = uniqueSerialNumber;
      HoistWorld.sharedState.generatedSerialNumber = uniqueSerialNumber;
    }

    // Caching ropeInfo
    HoistWorld.sharedState.ropeInfo = ropeInfo;

    await ropeRecord.fillRopeFields(ropeInfo);
    this.ropeRecord = ropeRecord;

    await executeWithDelay(); // Add delay to simulate real-world conditions
  },
);

Given('I reuse the same serial number and rope information from the previous rope', async function (this: IHoistWorld) {
  if (!this.generatedSerialNumber) {
    throw new Error('No previously generated serial number found to reuse.');
  }
  const ropeRecord = new CreateRopeRecord(this.page!);

  // Reuse the previous ropeInfo
  const ropeInfo = HoistWorld.sharedState.ropeInfo ?? {};

  // Reuse the previous serial number
  ropeInfo['Serial number'] = this.generatedSerialNumber;

  // Fill the form with the cached ropeInfo
  await ropeRecord.fillRopeFields(ropeInfo);
  this.ropeRecord = ropeRecord;
});

When('I click on Save', async function (this: IHoistWorld) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testName = this.testName ?? 'unknown';

  const screenshotPath = `${SCREENSHOT_DIR}/features/${testName}/before-save-${timestamp}.png`;

  await this.page?.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  await this.page?.getByRole('button', { name: 'Save' }).click();
});

Then('I should get a duplicate serial number error', async function (this: IHoistWorld) {
  const page = this.page!;
  await page
    .locator('div')
    .filter({ hasText: /^This serial number is already in use$/ })
    .nth(1)
    .waitFor({ state: 'visible', timeout: 180000 });
});

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
