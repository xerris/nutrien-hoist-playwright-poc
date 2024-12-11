import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import {
  APIRequestContext,
  Browser,
  BrowserContext,
  Cookie,
  Page,
  PlaywrightTestOptions
} from '@playwright/test';

import { EnvironmentConfig, environments } from '../config/logbook-environments';

export interface ILogbookWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  browser?: Browser;
  context?: BrowserContext;
  cookies?: Cookie[];
  page?: Page;
  testName?: string;
  startTime?: Date;
  server?: APIRequestContext;
  username?: string;
  playwrightOptions?: PlaywrightTestOptions;
  baseUrl: string; // Add this line
  envConfig: EnvironmentConfig;
  generatedSerialNumber?: string;
  actionItemDetails?: Record<string, string>;
}

export class LogbookWorld extends World implements ILogbookWorld {
  debug = false;
  baseUrl: string;
  envConfig: EnvironmentConfig;
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  cookies?: Cookie[] = []; // new change
  generatedSerialNumber?: string;
  actionItemDetails?: Record<string, string>;

  static sharedState: { generatedSerialNumber?: string } = {};

  constructor(options: IWorldOptions) {
    super(options);
    const env = process.env.ENV ?? 'development';

    // Get environment configuration
    this.envConfig = environments[env];
    this.baseUrl = this.envConfig.baseUrl;
  }
}

setWorldConstructor(LogbookWorld);