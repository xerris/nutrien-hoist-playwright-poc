import { Download, expect, Page } from '@playwright/test';

export class EmailVerification {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  verifyRequestExtensionEmailName(download: Download): void {
    const filename = download.suggestedFilename();
    expect(filename).toMatch(/^Request extension -.+\.eml$/);
  }
}
