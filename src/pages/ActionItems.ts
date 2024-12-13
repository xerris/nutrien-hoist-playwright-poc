import { Page } from '@playwright/test';

import { FormHelper } from '../support/FormHelper';

interface ActionItemMetadata {
  name: string;
  locator: string;
  type: string;
}

export class ActionItems {
  private readonly page: Page;
  private readonly formHelper;

  constructor(page: Page) {
    this.page = page;
    this.formHelper = new FormHelper();
  }

  private actionItemMetadata: ActionItemMetadata[] = [
    // locator not needed for select
    { name: 'Action item', locator: '#mui-29914', type: 'select' },
    { name: 'Rope', locator: '#mui-29914', type: 'select' },
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
    await this.setField('Elevation', value);
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
  private getFieldMetadata(fieldName: string): ActionItemMetadata | undefined {
    return this.actionItemMetadata.find(field => field.name === fieldName);
  }

  public async editActionItem(): Promise<void> {
    await this.page.getByRole('button').first().click();
  }
}
