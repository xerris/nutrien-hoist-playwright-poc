import { DataTable, Given } from '@cucumber/cucumber';
import { Page } from 'playwright';

// Define the structure of the rope metadata
interface RopeMetadata {
  name: string;
  locator: string;
  type: 'select' | 'input' | 'date';
}

// Define an array mapping field names to locators and types
const ropeMetadata: RopeMetadata[] = [
  { name: 'Rope Type', locator: '[id="Rope\\ type"]', type: 'select' },
  { name: 'Hoist \\#', locator: '[id="Hoist\\ \\#"]', type: 'select' },
  { name: 'Serial number', locator: 'input[name="serialNumber"]', type: 'input' },
  { name: 'Diameter of rope (optional)', locator: 'input[name="diameter"]', type: 'input' },
  { name: 'Weight of rope', locator: 'input[name="weight"]', type: 'input' },
  { name: 'Construction of rope', locator: 'input[name="construction"]', type: 'input' },
  { name: 'Type of lay', locator: '[id="Type\\ of\\ lay"]', type: 'select' },
  { name: 'Grade of steel', locator: 'input[name="grade"]', type: 'input' },
  { name: 'Manufacturer name', locator: 'input[name="manufacturerName"]', type: 'input' },
  { name: 'Manufacturer address', locator: 'input[name="manufacturerAddress"]', type: 'input' },
  { name: 'Manufacture date', locator: 'input[name="manufactureDate"]', type: 'date' }
];

// Helper function to find metadata by field name
const getFieldMetadata = (fieldName: string): RopeMetadata | undefined => {
  return ropeMetadata.find(field => field.name === fieldName);
};

Given('I provide the following rope information - greg', async function (dataTable: DataTable): Promise<void> {
  const page = this.page as Page;
  const ropeInfo = dataTable.rowsHash();

  for (const [fieldName, value] of Object.entries(ropeInfo)) {
    const fieldMetadata = getFieldMetadata(fieldName);
    if (!fieldMetadata) throw new Error(`${fieldName}: not found`);

    const locator = page.locator(fieldMetadata.locator);
    const cleanValue = value.replace(/"/g, '').trim().toLowerCase(); // Clean up value

    console.log(`filling in field: ${fieldName} with: ${cleanValue}`);

    if (fieldMetadata.type === 'select') {
      await locator.click();
      await page.getByRole('option', { name: cleanValue }).click();
      /* await locator.selectOption({ label: cleanValue }); */
      break;
    } else if (fieldMetadata.type === 'input') {
      await locator.fill(cleanValue);
    } else if (fieldMetadata.type === 'date') {
      await locator.fill(cleanValue); // Assuming date input accepts string format
    }
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
