import { Page } from '@playwright/test';

import { FormFieldMetadata, FormHelper } from '../support/FormHelper';

export class CreateActionItem {
  private readonly page: Page;
  private readonly formHelper: FormHelper;

  constructor(page: Page) {
    this.page = page;
    this.formHelper = new FormHelper();
  }

  public actionItemMetadata: FormFieldMetadata[] = [
    { name: 'Action item', type: 'select' },
    { name: 'Elevation (optional)', locator: 'input[name="elevation"]', type: 'input' },
    { name: 'Comment', locator: 'textarea[name="comment"]', type: 'input' },
    { name: 'Reported by', locator: '#mui-20023', type: 'select' },
  ];

  public async setFieldValue(fieldName: string, value: string, metadata: FormFieldMetadata[]): Promise<void> {
    const fieldMeta = metadata.find(meta => meta.name === fieldName);
    if (!fieldMeta) {
      throw new Error(`Field metadata not found for "${fieldName}"`);
    }
    await this.formHelper.setField(this.page, fieldName, value, metadata);
  }

  public async addNewActionItem(): Promise<void> {
    await this.page.getByLabel('add').click();
  }
}
