import { Download, expect } from '@playwright/test';

export class EmailVerification {
  verifyEmail(download: Download, expectedFilePattern: RegExp): boolean {
    const filename = download.suggestedFilename();
    expect(filename).toMatch(expectedFilePattern);
    return true;
  }
}
