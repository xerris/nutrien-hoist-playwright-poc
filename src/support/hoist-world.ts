import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import {
  BrowserContext,
  Page,
  PlaywrightTestOptions,
  APIRequestContext,
  Browser,
  Cookie
} from '@playwright/test';
import { environments, EnvironmentConfig } from '../config/hoist-environments';
import { CreateRopeRecord } from '../pages/CreateRopeRecord';

export interface IHoistWorld extends World {
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
  ropeRecord?: CreateRopeRecord;
  generatedSerialNumber?: string;

}
export class HoistWorld extends World implements IHoistWorld {
  debug = false;
  baseUrl: string;
  envConfig: EnvironmentConfig;
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  cookies?: Cookie[] = []; // new change
  ropeRecord?: CreateRopeRecord;
  generatedSerialNumber?: string;

  static sharedState: { generatedSerialNumber?: string } = {};

  constructor(options: IWorldOptions) {
    super(options);
    const env = process.env.ENV ?? 'development';

    // Get environment configuration
    this.envConfig = environments[env];
    this.baseUrl = this.envConfig.baseUrl;
  }
}

setWorldConstructor(HoistWorld);
