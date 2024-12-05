import { IHoistWorld } from '../../support/hoist-world';
import { Given } from '@cucumber/cucumber';

Given('I navigate to the Rope record page', async function (this: IHoistWorld) {
  const page = this.page!;
  await page.goto('https://dev.minesight.nutrien.com/hoist/ropes');

  await Promise.resolve();
});
