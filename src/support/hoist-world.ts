import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';

export interface IHoistWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;
  testName?: string;
  startTime?: Date;
  server?: APIRequestContext;
  username?: string;
  playwrightOptions?: PlaywrightTestOptions;
  baseUrl: string; // Add this line
}

export class HoistWorld extends World implements IHoistWorld {
  debug = false;
  baseUrl: string;

  constructor(options: IWorldOptions) {
    super(options);
    this.baseUrl = process.env.BASE_URL ?? 'http://localhost:4000'; // Initialize baseUrl
  }
}

setWorldConstructor(HoistWorld);
