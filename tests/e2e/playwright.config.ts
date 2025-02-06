import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: 'http://localhost:8000',
    actionTimeout: 2000,
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    }
  ],
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ],
};

export default config;
