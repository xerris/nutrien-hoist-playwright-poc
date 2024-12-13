import { expect, Page } from '@playwright/test';

import { FormFieldMetadata, FormHelper } from '../support/FormHelper';

export class ActionItems {
  private readonly page: Page;
  private readonly formHelper;

  constructor(page: Page) {
    this.page = page;
    this.formHelper = new FormHelper();
  }

  private actionItemMetadata: FormFieldMetadata[] = [
    // locator not needed for select
    { name: 'Action item', type: 'select' },
    { name: 'Rope', type: 'select' },
    { name: 'Elevation', locator: 'input[name="elevation"]', type: 'input' },
  ];

  private settersMap: Record<string, (value: string) => Promise<void>> = {
    'Action item': this.setActionItem.bind(this),
    'Elevation': this.setElevation.bind(this),
    'Rope': this.setRopeNumber.bind(this),
  };

  // Setter methods for each field
  public async setActionItem(value: string): Promise<void> {
    await this.setField('Action item', value);
  }

  public async setElevation(value: string): Promise<void> {
    const elevationLocator = this.page.getByLabel('Elevation').getByRole('textbox');
    await elevationLocator.click();

    const prefilledValue = await elevationLocator.inputValue();

    // if previous value is same as given value then update it with a random 2 digit int to enable the form
    if (prefilledValue === value) {
      console.log('generating a random two digit number for Elevation');
      const randomInt = Math.floor(10 + Math.random() * 90);
      await elevationLocator.fill(randomInt.toString());
    } else {
      await elevationLocator.fill(value);
    }
  }

  public async setRopeNumber(value: string): Promise<void> {
    await this.setField('Rope', value);
  }

  // Method to dynamically call the appropriate setter
  public async setFieldValue(name: string, value: string): Promise<void> {
    const setter = this.settersMap[name];

    if (setter) {
      await setter(value); // Call the setter dynamically
    } else {
      throw new Error(`${name}: not found`);
    }
  }

  // Helper function to find metadata by field name and set the value
  private async setField(fieldName: string, value: string): Promise<void> {
    const fieldMetadata = this.getFieldMetadata(fieldName);
    if (!fieldMetadata) throw new Error(`${fieldName}: not found`);

    console.log(`filling: ${fieldName} with value: ${value}`);
    await this.formHelper.fillFormFieldByLocator(this.page, {
      type: fieldMetadata.type,
      locator: fieldMetadata.locator,
      name: fieldName,
      value,
    });
  }

  // Method to retrieve metadata by field name
  private getFieldMetadata(fieldName: string): FormFieldMetadata | undefined {
    return this.actionItemMetadata.find(field => field.name === fieldName);
  }

  public async editActionItem(): Promise<void> {
    const button = this.page.getByRole('button').nth(1);
    await button.waitFor({ state: 'visible' });
    // Click the button
    await button.click();
    const text = this.page.getByText('Edit action item details', { exact: true });
    await expect(text).toBeVisible({ timeout: 60000 });
  }
}
