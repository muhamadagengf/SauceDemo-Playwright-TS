import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 1. Lokasi folder test kamu
  testDir: './tests',

  // 2. Maksimal waktu satu test berjalan (30 detik standar)
  timeout: 30 * 1000,

  // 3. Konfigurasi Reporter
  reporter: [
    ['list'], 
    ['allure-playwright', { 
       outputFolder: 'allure-results',
       detail: true,
       suiteTitle: false 
    }]
  ],

  // 4. Pengaturan global untuk semua browser
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    
    // BEST PRACTICE: Otomatis ambil screenshot & trace kalau test gagal
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // 5. Browser yang akan dijalankan
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});