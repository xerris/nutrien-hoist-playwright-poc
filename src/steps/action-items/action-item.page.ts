import { expect } from 'playwright/test';
import { IHoistWorld } from '../../../support/hoist-world';
import { Then } from '@cucumber/cucumber';

Then('I can see Hoist and shaft action items text', async function (this: IHoistWorld) {
  const page = this.page!;
  await expect(page.getByText('Hoist and shaft action items')).toBeVisible();
});
