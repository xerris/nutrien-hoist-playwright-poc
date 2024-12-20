import { expect, Page } from '@playwright/test';

import { FormFieldMetadata, FormHelper } from '../support/FormHelper';

export class CreateRopeRecord {
  private readonly page: Page;
  private readonly formHelper: FormHelper;

  constructor(page: Page) {
    this.page = page;
    this.formHelper = new FormHelper();
  }

  // Parent metadata object
  public ropeMetadata: FormFieldMetadata[] = [
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
    { name: 'Breaking load', type: 'input' },
    { name: 'Test number', type: 'input' },
    { name: 'Test date', type: 'date' },
    { name: 'Class of core used in the rope', type: 'input' },
    { name: 'Number of strands in the rope', type: 'input' },
    { name: 'Number of wires in each strand', type: 'input' },
    { name: 'Diameter of wires', type: 'input' },
    { name: 'Breaking stress of steel', type: 'input' },
    { name: 'Standard torsion test of the', type: 'input' },
    { name: 'The percentage by mass of', type: 'input' },
    { name: 'The trade name of the', type: 'input' },
  ];

  // Dynamic field value setter
  public async setFieldValue(fieldName: string, value: string, metadata: FormFieldMetadata[]): Promise<void> {
    const fieldMeta = metadata.find(meta => meta.name === fieldName);
    if (!fieldMeta) {
      throw new Error(`Field metadata not found for "${fieldName}"`);
    }
    await this.formHelper.setField(this.page, fieldName, value, metadata);
  }

  // Central method to fill fields dynamically
  public async fillRopeFields(ropeInfo: Record<string, string>): Promise<void> {
    // Iterate over the ropeInfo object and set each field dynamically
    for (const [fieldName, value] of Object.entries(ropeInfo)) {
      await this.setFieldValue(fieldName, value, this.ropeMetadata);
    }
  }

  // Open modals and tabs
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

    // Handling accordions
    const accordionTabs = ['Rope information', 'Construction info', 'Breaking load test info'];
    for (const tabName of accordionTabs) {
      await this.openAccordionTab(tabName);
    }
  }
}
