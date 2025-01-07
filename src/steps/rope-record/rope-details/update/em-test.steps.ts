import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CreateRopeRecord } from '@/pages/CreateRopeRecord';
import { IHoistWorld } from '@/support/hoist-world';

When(
  'I provide the following information in the Add EM test record form',
  async function (this: IHoistWorld, emTestRecordInfo: DataTable) {
    await this.page?.getByTestId('Add record').click();
    const ropeRecord = new CreateRopeRecord(this.page!);
    const emTestRecord = emTestRecordInfo.rowsHash();
    for (const [fieldName, value] of Object.entries(emTestRecord)) {
      await ropeRecord.setFieldValue(fieldName, value, ropeRecord.ropeMetadata);
    }

    // attach sample.pdf as the file
    await this.page
      ?.locator('input[data-testid="openAttachmentUpload"]')
      .setInputFiles('src/fixtures/sample.pdf');
  },
);

Then('I should be able to see the record in the Records table', async function (this: IHoistWorld) {
  const page = this.page!;

  // save the EM test date input
  const savedPercentLoss = await page
    .getByRole('textbox', { name: 'Percent loss', exact: true })
    .inputValue();

  // save the form
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  // wait for success notification
  await expect(page.getByText('EM test record added')).toBeVisible();

  // verify saved percent loss
  await expect(page.getByRole('main')).toContainText(`${savedPercentLoss}%`);
});
