import { DataTable, When } from '@cucumber/cucumber';

import { CreateRopeRecord } from '../../../pages/CreateRopeRecord';
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
    console.log('downloading email', download1);
  },
);
