import { Download, expect, Page } from '@playwright/test';

export class EmailVerification {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  verifyEmail(download: Download, expectedFilePattern: RegExp): boolean {
    const filename = download.suggestedFilename();
    expect(filename).toMatch(expectedFilePattern);
    return true;
  }
}
