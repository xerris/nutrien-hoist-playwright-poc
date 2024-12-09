import { DataTable, Given, When } from '@cucumber/cucumber';
import { UniqueIdentifierGenerator } from '../../../support/UniqueIdentifierGenerator';
import { CreateRopeRecord } from '../../../pages/CreateRopeRecord';
import { IHoistWorld } from '../../../support/hoist-world';

Given('I provide the following rope information - greg', async function (this: IHoistWorld, dataTable: DataTable): Promise<void> {
  const page = this.page!;
  const uniqueGenerator = new UniqueIdentifierGenerator();
  const ropeInfo = dataTable.rowsHash();
  const ropeRecord = new CreateRopeRecord(page); // Create an instance of CreateRopeRecord

  for (const [fieldName, value] of Object.entries(ropeInfo)) {
    let cleanValue = value.replace(/"/g, '').trim().toLowerCase(); // Clean up value

    if (fieldName === 'Serial number') {
      cleanValue = uniqueGenerator.generateUniqueValue('CUCSNO', 6); // Generate unique serial number
      this.generatedSerialNumber = cleanValue;
    }
    await ropeRecord.setFieldValue(fieldName, cleanValue);
  }
  this.ropeRecord = ropeRecord;
  await executeWithDelay();
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

When('I do this', function (this: IHoistWorld) {
  if (this.generatedSerialNumber) {
    console.log(`Generated serial number: ${this.generatedSerialNumber}`);
  }
});
