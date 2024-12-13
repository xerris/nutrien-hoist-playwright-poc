import { Page } from '@playwright/test';

export class MonthlyActionItemPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async selectLogBookType(): Promise<this> {
    const buttonNames = [
      'Hoist operators\' logbook',
      'Hoisting machinery logbook',
      'Shaft inspection logbook',
      'Electrical hoisting equipment'
    ];

    const page = this.page;

    for (const name of buttonNames) {
    // Wait for the button to be visible, timeout set for each button name
      try {
        const button = page.getByRole('button', { name }).first();
        await button.waitFor({ state: 'visible', timeout: 180000 }); // Wait up to 3 minutes
        await button.click();
        console.log(`Clicked on button: ${name}`);
        break;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log(`Button not visible yet: ${name}`);
      }
    }

    // Ensure the dropdown option is also visible and clickable
    const dropdownOption = page.getByRole('option', { name: 'Hoisting machinery logbook' });
    await dropdownOption.waitFor({ state: 'visible' }); // Wait for the dropdown option to appear
    await dropdownOption.click();

    // Wait for the expected text and URL
    await page.waitForURL(
      'https://dev-hoist.minesight.nutrien.com/logbooks/machinery/inspections/daily'
    );

    console.log('Logbook type selection completed');
    return this;
  }

  public async selectActionItem(): Promise<this> {
    await this.page.getByRole('button', { name: 'Action items' }).click();
    await this.page.waitForURL(
      'https://dev-hoist.minesight.nutrien.com/logbooks/machinery/action-items'
    );
    return this;
  }
}
