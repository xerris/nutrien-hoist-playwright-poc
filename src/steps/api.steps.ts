import { IHoistWorld } from '../support/hoist-world';
import { expect } from '@playwright/test';
import { Given } from '@cucumber/cucumber';

Given('A cat fact is received', async function (this: IHoistWorld) {
  const response = await this.server?.get('facts');
  expect(response).toBeDefined();
});
