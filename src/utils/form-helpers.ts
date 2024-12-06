import { Page } from '@playwright/test';

export function escapeString(str: string): string {
  // escape special characters for css compatibility
  const escapedString = str.replace(/([ #;?%&,.+*~':"!^$[\]()=>|\/@])/g, '\\$1');

  // Split the string by spaces, make the first word uppercase, rest lowercase
  const word = escapedString.split(' ');
  return word
    .map((word, index) => (index === 0 ? word : word.toLowerCase()))
    .join(' ');
}

export async function fillFormField(page: Page, { type, name, value }: {
  type: string;
  name: string;
  value: string;
}) {
  switch (type) {
    case 'select': {
      const locator = `[id="${escapeString(name)}"]`;
      console.log(`Selecting '${value}' for field '${name}' using locator '${locator}'`);
      await page.locator(locator).click();
      await page.getByRole('option', { name: value }).click();
      break;
    }

    case 'date':
      await page.getByRole('textbox', { name }).click();
      await page.getByRole('button', { name: 'OK', exact: true }).click();
      break;

    case 'input':
    default:
      await page.getByRole('textbox', { name }).fill(value.toString());
  }
}
