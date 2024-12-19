import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CreateRopeRecord } from '../../../pages/CreateRopeRecord';
import { EmailVerification } from '../../../pages/EmailVerification';
import { IHoistWorld } from '../../../support/hoist-world';

When(
  'I provide the following information in the Request Extension form',
  async function (this: IHoistWorld, requestExtensionInfo: DataTable) {
    const page = this.page!;
    await page.getByTestId('requestExtButton').click();
    const ropeRecord = new CreateRopeRecord(page);
    const requestExtensionData = requestExtensionInfo.rowsHash();
    for (const [fieldName, value] of Object.entries(requestExtensionData)) {
      await ropeRecord.setFieldValue(fieldName, value, ropeRecord.ropeMetadata);
    }
    await page.getByRole('button', { name: 'Next' }).click();
    // for download and Confirmation modal
    const download1Promise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Confirm' }).click();
    const download1 = await download1Promise;
    const emailPage = new EmailVerification(this.page!);
    emailPage.verifyRequestExtensionEmailName(download1);
  },
);

Then(
  'I should be able to see the request in Extension history section',
  async function (this: IHoistWorld) {
    await this.page?.getByRole('tab', { name: 'Rope information' }).click();
    const page = this.page!;
    const expectedValue = '6';
    await expect(page.getByText(`Requested: ${expectedValue} days`).first()).toBeVisible();
  },
);
