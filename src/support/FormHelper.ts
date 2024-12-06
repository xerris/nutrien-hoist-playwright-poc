import { Page } from '@playwright/test';

export class FormHelper {
  // Method to escape special characters for CSS compatibility
  public escapeString(str: string): string {
    const escapedString = str.replace(/([ #;?%&,.+*~':"!^$[\]()=>|\/@])/g, '\\$1');

    // Split the string by spaces, make the first word uppercase, rest lowercase
    const words = escapedString.split(' ');
    return words
      .map((word, index) => (index === 0 ? word : word.toLowerCase()))
      .join(' ');
  }

  // Main method to fill form fields based on type
  public async fillFormField(page: Page, { type, name, value }: {
    type: string;
    name: string;
    value: string;
  }): Promise<void> {
    switch (type) {
      case 'select':
        await this.fillSelectField(page, name, value);
        break;

      case 'date':
        await this.fillDateField(page, name);
        break;

      case 'input':
      default:
        await this.fillInputField(page, name, value);
    }
  }

  // Method to fill select fields
  private async fillSelectField(page: Page, name: string, value: string): Promise<void> {
    const locator = `[id="${this.escapeString(name)}"]`;
    await page.locator(locator).click();
    await page.getByRole('option', { name: value }).click();
  }

  // Method to fill date fields
  private async fillDateField(page: Page, name: string): Promise<void> {
    await page.getByRole('textbox', { name }).click();
    await page.getByRole('button', { name: 'OK', exact: true }).click();
  }

  // Method to fill input fields
  private async fillInputField(page: Page, name: string, value: string): Promise<void> {
    await page.getByRole('textbox', { name }).fill(value.toString());
  }
}
