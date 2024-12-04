import { IHoistWorld } from '../../support/hoist-world';
import { Given } from '@cucumber/cucumber';

Given('I navigate to the Rope record page', async function (this: IHoistWorld) {
  console.log('I navigate to the Rope record page');
  console.log(`baseUrl: ${this.baseUrl}`);

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Rope record page navigation stub completed');
});
