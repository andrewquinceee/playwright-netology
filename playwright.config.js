// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Тесты идут по очереди, по одному: так сайт не блокирует вход
  fullyParallel: false,
  workers: 1,

  forbidOnly: !!process.env.CI,
  retries: 0,

  reporter: [['html', { open: 'never' }]],

  use: {
    // Снимок экрана, если тест упал
    screenshot: 'on',
    trace: 'on-first-retry',
  },

  // Только Chrome: меньше попыток входа, меньше шанс блокировки
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});