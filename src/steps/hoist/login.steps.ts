import { ICustomWorld } from '../../support/custom-world';
import { Given } from '@cucumber/cucumber';

Given('I login as a Lanigan site-admin', async function (this: ICustomWorld) {
  console.log('I login as a Lanigan site-admin');

  // Stub await using Promise.resolve()
  await Promise.resolve();

  console.log('Login stub completed');
});
