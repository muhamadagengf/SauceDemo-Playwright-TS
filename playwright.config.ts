import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
    ['list'], // Tetap tampilkan log di terminal
    ['allure-playwright', { 
       outputFolder: 'allure-results',
       detail: true,
       suiteTitle: false 
    }]
  ],
projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' }
    }
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
  },
});
