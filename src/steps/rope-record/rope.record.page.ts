import { DataTable, Given, When } from '@cucumber/cucumber';
import { UniqueIdentifierGenerator } from '../../../support/UniqueIdentifierGenerator';
import { CreateRopeRecord } from '../../../pages/Hoist/CreateRopeRecord';
import { HoistWorld, IHoistWorld } from '../../../support/hoist-world';

Given('I add a new rope', async function (this: IHoistWorld) {
  const createRopeRecord = new CreateRopeRecord(this.page!);
  await createRopeRecord.addNewRope();
});

Given(
  'I provide the following rope information - greg',
  async function (this: IHoistWorld, dataTable: DataTable): Promise<void> {
    const page = this.page!;
    const uniqueGenerator = new UniqueIdentifierGenerator();
    const ropeInfo = dataTable.rowsHash();
    const ropeRecord = new CreateRopeRecord(page); // Create an instance of CreateRopeRecord

    for (const [fieldName, value] of Object.entries(ropeInfo)) {
      let cleanValue = value.replace(/"/g, '').trim().toLowerCase(); // Clean up value

      if (fieldName === 'Serial number') {
        cleanValue = uniqueGenerator.generateUniqueValue('CUCSNO', 6); // Generate unique serial number
        this.generatedSerialNumber = cleanValue;
        HoistWorld.sharedState.generatedSerialNumber = cleanValue;
      }
      await ropeRecord.setFieldValue(fieldName, cleanValue);
    }
    this.ropeRecord = ropeRecord;
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

When('I do this', function (this: IHoistWorld) {
  if (this.generatedSerialNumber) {
    console.log(`Generated serial number: ${HoistWorld.sharedState.generatedSerialNumber}`);
  }
});

When('I click on Save', async function (this: IHoistWorld) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testName = this.testName ?? 'unknown';

  const screenshotPath = `screenshots/features/${testName}/before-save-${timestamp}.png`;

  await this.page?.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  await this.page?.getByRole('button', { name: 'Save' }).click();
});