import { Page } from '@playwright/test';

export interface FormFieldMetadata {
  name: string;
  locator?: string;
  type: string;
}
export class FormHelper {
  // Method to escape special characters for CSS compatibility
  public escapeString(str: string): string {
    const escapedString = str.replace(/([ #;?%&,.+*~':"!^$[\]()=>|\/@])/g, '\\$1');

    // Split the string by spaces, make the first word uppercase, rest lowercase
    const words = escapedString.split(' ');
    return words.map((word, index) => (index === 0 ? word : word.toLowerCase())).join(' ');
  }

  // Main method to fill form fields based on type
  public async fillFormField(
    page: Page,
    {
      type,
      name,
      value,
      locator,
    }: {
      type: string;
      name: string;
      value: string;
      locator?: string;
    },
  ): Promise<void> {
    switch (type) {
      case 'select':
        await this.fillSelectField(page, name, value);
        break;

      case 'date':
        await this.fillDateField(page, name, value);
        break;

      case 'input':
      default:
        await this.fillInputField(page, name, value, locator);
    }
  }

  // Method to fill input fields
  private async fillInputField(
    page: Page,
    name: string,
    value: string,
    locator?: string,
  ): Promise<void> {
    if (locator) {
      await page.locator(locator).fill(value.toString());
    } else {
      await page.getByRole('textbox', { name }).fill(value.toString());
    }
  }

  private async fillSelectField(page: Page, name: string, value: string): Promise<void> {
    const locator = `[id="${this.escapeString(name)}"]`;

    try {
      await page.locator(locator).click({ timeout: 3000 });
    } catch {
      await page.getByText(name, { exact: true }).click({ timeout: 3000 });
    }
    await page.getByRole('option', { name: value }).click({ timeout: 3000 });
  }

  // Method to fill date fields
  private async fillDateField(page: Page, name: string, dateString?: string): Promise<void> {
    await page.getByText(name).click();

    if (!dateString) {
      await page.getByRole('button', { name: 'OK', exact: true }).click();
      return;
    }

    const date = new Date(dateString);
    const targetYear = date.getFullYear().toString();
    const targetMonth = date.toLocaleString('default', { month: 'long' });
    const targetDay = date.getDate().toString();

    // click the current year to display the year list
    await page.getByRole('button', { name: targetYear }).click();
    // then select the target year
    await page
      .locator('div')
      .filter({ hasText: new RegExp(`^${targetYear}$`) })
      .click();

    // get current month and year
    const getCurrentHeader = async () => {
      const headerLocator = page.locator('div').filter({
        hasText: new RegExp(`^${targetMonth} ${targetYear}SuMoTuWeThFrSa$`),
      });
      const exists = (await headerLocator.count()) > 0;
      if (!exists) return null;
      const header = await headerLocator.textContent();
      return header?.split(' ')[0] ?? null;
    };

    let currentMonth = await getCurrentHeader();

    // navigate until we reach target month
    while (currentMonth !== targetMonth) {
      if (!currentMonth) {
        // move forward until header (selected month) matches target month
        await page
          .locator('div')
          .filter({
            hasText: /^[A-Za-z]+ \d{4}SuMoTuWeThFrSa$/,
          })
          .getByRole('button')
          .nth(1)
          .click();
      } else {
        const currentDate = new Date(`${currentMonth} 1 ${targetYear}`);
        const targetDate = new Date(`${targetMonth} 1 ${targetYear}`);

        if (currentDate < targetDate) {
          await page
            .locator('div')
            .filter({
              hasText: new RegExp(`^${currentMonth} ${targetYear}SuMoTuWeThFrSa$`),
            })
            .getByRole('button')
            .nth(1)
            .click();
        } else {
          await page
            .locator('div')
            .filter({
              hasText: new RegExp(`^${currentMonth} ${targetYear}SuMoTuWeThFrSa$`),
            })
            .getByRole('button')
            .first()
            .click();
        }
      }

      await page.waitForTimeout(100);
      currentMonth = await getCurrentHeader();
    }

    // select the date
    await page.getByRole('button', { name: targetDay, exact: true }).click();
  }

  public getFieldMetadata(
    fieldName: string,
    metadata: FormFieldMetadata[] = [],
  ): FormFieldMetadata | undefined {
    return metadata.find(field => field.name === fieldName);
  }

  public async setField(
    page: Page,
    fieldName: string,
    value: string,
    metadata: FormFieldMetadata[] = [],
  ): Promise<void> {
    const fieldMetadata = this.getFieldMetadata(fieldName, metadata);
    if (!fieldMetadata) throw new Error(`${fieldName}: not found`);

    console.log(`filling: ${fieldName} with value: ${value}`);

    const fillOptions = {
      type: fieldMetadata.type,
      name: fieldName,
      value,
      locator: fieldMetadata.locator,
    };

    await this.fillFormField(page, fillOptions);
  }
}
