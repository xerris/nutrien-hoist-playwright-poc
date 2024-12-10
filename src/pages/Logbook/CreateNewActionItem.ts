import { Page } from '@playwright/test';
import { FormHelper } from '../../support/FormHelper';

interface ActionItemMetadata {
  name: string;
  locator: string;
  type: string;
}

export class CreateActionItem {
  private readonly page: Page;
  private readonly formHelper;

  constructor(page: Page) {
    this.page = page;
    this.formHelper = new FormHelper();
  }

  private actionItemMetadata: ActionItemMetadata[] = [
    // locator for the select types are not req / works, so we'll prob remove that
    { name: 'Action item', locator: '#mui-29914', type: 'select' },
    { name: 'Elevation (optional)', locator: 'input[name="elevation"]', type: 'input' },
    { name: 'Comment', locator: 'textarea[name="comment"]', type: 'input' },
    { name: 'Reported by', locator: '#mui-20023', type: 'select' }
  ];

  private settersMap: Record<string, (value: string) => Promise<void>> = {
    'Action item': this.setActionItem.bind(this),
    'Elevation (optional)': this.setElevation.bind(this),
    'Comment': this.setComment.bind(this),
    'Reported by': this.setReportedBy.bind(this)
  };

  // Setter methods for each field
  public async setActionItem(value: string): Promise<void> {
    await this.setField('Action item', value);
  }

  public async setElevation(value: string): Promise<void> {
    await this.setField('Elevation (optional)', value);
  }

  public async setComment(value: string): Promise<void> {
    await this.setField('Comment', value);
  }

  public async setReportedBy(value: string): Promise<void> {
    await this.setField('Reported by', value);
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
      value
    });
  }

  // Method to retrieve metadata by field name
  private getFieldMetadata(fieldName: string): ActionItemMetadata | undefined {
    return this.actionItemMetadata.find(field => field.name === fieldName);
  }

  public async addNewActionItem(): Promise<void> {
    await this.page.getByLabel('add').click();
  }
}
