import { expect, Page } from '@playwright/test';

import { FormFieldMetadata, FormHelper } from '../support/FormHelper';

export class CreateRopeRecord {
  private readonly page: Page;
  private readonly formHelper;

  constructor(page: Page) {
    this.page = page;
    this.formHelper = new FormHelper();
  }

  private ropeMetadata: FormFieldMetadata[] = [
    { name: 'Rope type', type: 'select' },
    { name: 'Hoist #', type: 'select' },
    { name: 'Serial number', type: 'input' },
    { name: 'Diameter of rope (optional)', type: 'input' },
    { name: 'Weight of rope', type: 'input' },
    { name: 'Construction of rope', type: 'input' },
    { name: 'Type of lay', type: 'select' },
    { name: 'Grade of steel', type: 'input' },
    { name: 'Manufacturer name', type: 'input' },
    { name: 'Manufacturer address', type: 'input' },
    { name: 'Manufacture date', type: 'date' },
  ];

  private breakingLoadMetadata: FormFieldMetadata[] = [
    { name: 'Breaking load', type: 'input' },
    { name: 'Test number', type: 'input' },
    { name: 'Test date', type: 'date' },
  ];

  private constructionInfoMetaData: FormFieldMetadata[] = [
    {
      name: 'Class of core used in the rope',
      type: 'input',
    },
    {
      name: 'Number of strands in the rope',
      type: 'input',
    },
    {
      name: 'Number of wires in each strand',
      type: 'input',
    },
    { name: 'Diameter of wires', type: 'input' },
    { name: 'Breaking stress of steel', type: 'input' },
    {
      name: 'Standard torsion test of the',
      type: 'input',
    },
    { name: 'The percentage by mass of', type: 'input' },
    { name: 'The trade name of the', type: 'input' },
  ];

  private settersMap: Record<string, (value: string) => Promise<void>> = {
    'Rope type': this.setRopeType.bind(this),
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
    'Test number': this.setBreakingLoadTestNumber.bind(this),
    'Test date': this.setBreakingLoadTestDate.bind(this),
    'Class of core used in the rope': this.setClassOfCore.bind(this),
    'Number of strands in the rope': this.setNumberOfStrands.bind(this),
    'Number of wires in each strand': this.setNumberOfWires.bind(this),
    'Diameter of wires': this.setDiameterOfWires.bind(this),
    'Breaking stress of steel': this.setBreakingStress.bind(this),
    'Standard torsion test of the': this.setStandardTorsion.bind(this),
    'The percentage by mass of': this.setPercentageByMass.bind(this),
    'The trade name of the': this.setTradeName.bind(this),
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
    await this.setField('Rope type', value);
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

  public async setClassOfCore(value: string): Promise<void> {
    await this.setField('Class of core used in the rope', value);
  }

  public async setNumberOfStrands(value: string): Promise<void> {
    await this.setField('Number of strands in the rope', value);
  }

  public async setNumberOfWires(value: string): Promise<void> {
    await this.setField('Number of wires in each strand', value);
  }

  public async setDiameterOfWires(value: string): Promise<void> {
    await this.setField('Diameter of wires', value);
  }

  public async setBreakingStress(value: string): Promise<void> {
    await this.setField('Breaking stress of steel', value);
  }

  public async setStandardTorsion(value: string): Promise<void> {
    await this.setField('Standard torsion test of the', value);
  }

  public async setPercentageByMass(value: string): Promise<void> {
    await this.setField('The percentage by mass of', value);
  }

  public async setTradeName(value: string): Promise<void> {
    await this.setField('The trade name of the', value);
  }

  // Helper function to find metadata by field name and set the value
  private async setField(fieldName: string, value: string): Promise<void> {
    const combinedRopeMetadata = [
      ...this.ropeMetadata,
      ...this.breakingLoadMetadata,
      ...this.constructionInfoMetaData,
    ];

    await this.formHelper.setField(this.page, fieldName, value, combinedRopeMetadata);
  }

  async openAddRecordsModal() {
    await this.page.waitForSelector('text=Applied:', { state: 'visible' });
    const text = this.page.getByText('Add records', { exact: true });
    await expect(text).toBeVisible();
    await text.click();
  }

  async selectAddNewRope() {
    await this.page.waitForSelector('text=Add new rope', { state: 'visible' });
    const addNewRope = this.page.getByText('Add new rope', { exact: true });
    await expect(addNewRope).toBeVisible();
    await addNewRope.click();
  }

  async openAccordionTab(tabName: string) {
    await this.page.waitForSelector(`text=${tabName}`, { state: 'visible' });
    const accordion = this.page.getByText(tabName, { exact: true });
    await expect(accordion).toBeVisible();
    await accordion.click();
  }

  async addNewRope() {
    await this.openAddRecordsModal();
    await this.selectAddNewRope();

    // open the accordions to render the DOM
    await this.openAccordionTab('Rope information');
    await this.openAccordionTab('Construction info');
    await this.openAccordionTab('Breaking load test info');
  }
}
