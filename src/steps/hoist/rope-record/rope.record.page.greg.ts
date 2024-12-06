import { DataTable, Given } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { UniqueIdentifierGenerator } from '../../../support/UniqueIdentifierGenerator';
import { CreateRopeRecord } from '../../../pages/CreateRopeRecord';

Given('I provide the following rope information - greg', async function (dataTable: DataTable): Promise<void> {
  const page = this.page as Page;
  const uniqueGenerator = new UniqueIdentifierGenerator();
  const ropeInfo = dataTable.rowsHash();
  const ropeRecord = new CreateRopeRecord(page); // Create an instance of CreateRopeRecord

  for (const [fieldName, value] of Object.entries(ropeInfo)) {
    let cleanValue = value.replace(/"/g, '').trim().toLowerCase(); // Clean up value

    if (fieldName === 'Serial number')
      cleanValue = uniqueGenerator.generateUniqueValue('CUCSNO', 6); // Generate unique serial number

    ropeRecord.setFieldValue(fieldName, cleanValue);
  }

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
