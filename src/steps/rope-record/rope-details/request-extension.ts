import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CreateRopeRecord } from '../../../pages/CreateRopeRecord';
import { EmailVerification } from '../../../pages/EmailVerification';
import { IHoistWorld } from '../../../support/hoist-world';

Then(
  'I should be able to see the request in Extension history section',
  async function (this: IHoistWorld) {
    const page = this.page!;

    // save the number of days that were requested
    const daysRequestedLocator = page.getByLabel('Request by days').getByRole('textbox');
    const daysRequested = await daysRequestedLocator.inputValue();

    // save the form
    await page.getByRole('button', { name: 'Next' }).click();

    // download the Request Extension eml
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Confirm' }).click();
    const emailDownload = await downloadPromise;

    const emailPage = new EmailVerification(this.page!);
    emailPage.verifyEmail(emailDownload, /^Request extension -.+\.eml$/);

    // navigate to Rope information tab to verify the extension request
    await page.getByRole('tab', { name: 'Rope information' }).click();
    console.log('searching for days', daysRequested);
    await expect(page.getByText(`Requested: ${daysRequested} days`).first()).toBeVisible();
  },
);

When(
  'I request an extension for {string} days',
  async function (this: IHoistWorld, daysReq: string) {
    const page = this.page!;
    await page.getByTestId('requestExtButton').click();
    const ropeRecord = new CreateRopeRecord(page);
    await ropeRecord.setFieldValue('Request by days', daysReq, ropeRecord.ropeMetadata);
  },
);

When(
  'I request an extension until {string}',
  async function (this: IHoistWorld, dateString: string) {
    const page = this.page!;
    await page.getByTestId('requestExtButton').click();
    await page.getByRole('button', { name: 'By date' }).click();
    const ropeRecord = new CreateRopeRecord(page);
    await ropeRecord.setFieldValue('Request by date', dateString, ropeRecord.ropeMetadata);
  },
);
