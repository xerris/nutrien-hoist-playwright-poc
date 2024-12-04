import { IHoistWorld } from '../support/hoist-world';
import { compareToBaseImage, getImagePath } from '../utils/compareImages';
import { Given, Then } from '@cucumber/cucumber';

Then('Snapshot {string}', async function (this: IHoistWorld, name: string) {
  const { page } = this;
  await page?.screenshot({ path: getImagePath(this, name) });
});

Then('Snapshot', async function (this: IHoistWorld) {
  const { page } = this;
  const image = await page?.screenshot();
  if (image) {
    this.attach(image, 'image/png');
  }
});

Then('debug', function () {
  debugger;
});

Then('Screen matches the base image {string}', async function (this: IHoistWorld, name: string) {
  const screenshot = await this.page!.screenshot({});
  await compareToBaseImage(this, name, screenshot);
});

Given('Use Fake time {string}', async function (this: IHoistWorld, time: string) {
  await this.page!.clock.setFixedTime(new Date(time));
});
