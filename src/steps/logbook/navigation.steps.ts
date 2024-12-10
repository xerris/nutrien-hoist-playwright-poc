import { Given } from '@cucumber/cucumber';

import { ILogbookWorld } from '../../support/logbook-world';
import { MonthlyActionItemPage } from '../../pages/Logbook/MonthlyActionItemPage';

Given('I navigate to Monthly Action items page', async function (this: ILogbookWorld) {
  const page = this.page!;
  const selectLogBookType = new MonthlyActionItemPage(page);

  await selectLogBookType.selectLogBookType();
  await selectLogBookType.selectActionItem();
});
