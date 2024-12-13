import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

if (!process.env.CI) {
  dotenv.config({ path: '.env' });
}

export default defineConfig({
  testDir: './setup',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // Set a timeout for each test
  timeout: 3 * 60 * 1000,
  expect: {
    // Maximum timeout for each expect statement
    timeout: 30 * 1000,
  },
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /login.setup.ts/,
    },
  ],
});
