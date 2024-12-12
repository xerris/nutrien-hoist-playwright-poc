import { Given } from '@cucumber/cucumber';

import { MonthlyActionItemPage } from '../pages/MonthlyActionItemPage';
import { ILogbookWorld } from '../support/logbook-world';

Given('I navigate to Monthly Action items page', async function (this: ILogbookWorld) {
  const page = this.page!;
  const selectLogBookType = new MonthlyActionItemPage(page);

  await selectLogBookType.selectLogBookType();
  await selectLogBookType.selectActionItem();
});
