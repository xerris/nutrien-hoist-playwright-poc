import { IHoistWorld } from '../../support/hoist-world';
import { Given } from '@cucumber/cucumber';

Given('I login as a Lanigan site-admin', async function (this: IHoistWorld) {
  console.log('I login as a Lanigan site-admin');
  console.log(`baseUrl: ${this.baseUrl}`);

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Login stub completed');
});
