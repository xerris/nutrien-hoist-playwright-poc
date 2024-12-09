import { Page } from '@playwright/test';
import { FormHelper } from '../support/FormHelper';

interface RopeMetadata {
  name: string;
  locator: string;
  type: string;
}

export class CreateRopeRecord {
  private readonly page: Page;
  private readonly formHelper;

  constructor(page: Page) {
    this.page = page;
    this.formHelper = new FormHelper();
  }

  private ropeMetadata: RopeMetadata[] = [
    { name: 'Rope Type', locator: '[id="Rope\\ type"]', type: 'select' },
    { name: 'Hoist #', locator: '[id="Hoist\\ \\#"]', type: 'select' },
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

  private breakingLoadMetadata: RopeMetadata[] = [
    { name: 'Breaking load', locator: 'Breaking load', type: 'input' },
    { name: 'Test number', locator: 'Test number', type: 'input' },
    { name: 'Test date', locator: 'Test date', type: 'date' }
  ];

  private settersMap: Record<string, (value: string) => Promise<void>> = {
    'Rope Type': this.setRopeType.bind(this),
    'Hoist #': this.setHoistNumber.bind(this),
    'Serial number': this.setSerialNumber.bind(this),
    'Diameter of rope (optional)': this.setDiameter.bind(this),
    'Weight of rope': this.setWeight.bind(this),
    'Construction of rope': this.setConstruction.bind(this),
    'Type of lay': this.setTypeOfLay.bind(this),
    'Grade of steel': this.setGradeOfSteel.bind(this),
    'Manufacturer name': this.setManufacturerName.bind(this),
    'Manufacturer address': this.setManufacturerAddress.bind(this),
    'Manufacture date': this.setManufactureDate.bind(this),
    'Breaking load': this.setBreakingLoad.bind(this),
    'TestNumber': this.setBreakingLoadTestNumber.bind(this),
    'TestDate': this.setBreakingLoadTestDate.bind(this)
  };

  // Method to dynamically call the appropriate setter
  public async setFieldValue(name: string, value: string): Promise<void> {
    const setter = this.settersMap[name];

    if (setter) {
      await setter(value); // Call the setter dynamically
    } else {
      throw new Error(`${name}: not found`);
    }
  }

  // Setter methods for each field
  public async setRopeType(value: string): Promise<void> {
    await this.setField('Rope Type', value);
  }

  public async setHoistNumber(value: string): Promise<void> {
    await this.setField('Hoist #', value);
  }

  public async setSerialNumber(value: string): Promise<void> {
    await this.setField('Serial number', value);
  }

  public async setDiameter(value: string): Promise<void> {
    await this.setField('Diameter of rope (optional)', value);
  }

  public async setWeight(value: string): Promise<void> {
    await this.setField('Weight of rope', value);
  }

  public async setConstruction(value: string): Promise<void> {
    await this.setField('Construction of rope', value);
  }

  public async setTypeOfLay(value: string): Promise<void> {
    await this.setField('Type of lay', value);
  }

  public async setGradeOfSteel(value: string): Promise<void> {
    await this.setField('Grade of steel', value);
  }

  public async setManufacturerName(value: string): Promise<void> {
    await this.setField('Manufacturer name', value);
  }

  public async setManufacturerAddress(value: string): Promise<void> {
    await this.setField('Manufacturer address', value);
  }

  public async setManufactureDate(value: string): Promise<void> {
    await this.setField('Manufacture date', value);
  }

  public async setBreakingLoad(value: string): Promise<void> {
    await this.setField('Breaking load', value);
  }

  public async setBreakingLoadTestNumber(value: string): Promise<void> {
    await this.setField('Test number', value);
  }

  public async setBreakingLoadTestDate(value: string): Promise<void> {
    await this.setField('Test date', value);
  }

  // Helper function to find metadata by field name and set the value
  private async setField(fieldName: string, value: string): Promise<void> {
    const fieldMetadata = this.getFieldMetadata(fieldName);
    if (!fieldMetadata) throw new Error(`${fieldName}: not found`);

    console.log(`filling: ${fieldName} with value: ${value}`);
    await this.formHelper.fillFormField(this.page,
      { type: fieldMetadata.type, name: fieldMetadata.name, value: value });
  }

  // Method to retrieve metadata by field name
  private getFieldMetadata(fieldName: string): RopeMetadata | undefined {
    const combinedRopeMetadata = [...this.ropeMetadata, ...this.breakingLoadMetadata];
    return combinedRopeMetadata.find(field => field.name === fieldName);
  }
}
