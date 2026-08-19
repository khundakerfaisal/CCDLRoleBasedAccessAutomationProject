// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 100000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: 4,
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html', //Only Playwright HTML report

  reporter: [
    //Allure report configuration Start
    // ['list'],
    // ['allure-playwright']
    //Allure report configuration End



    //Monocart report configuration Start
    ['list'],
    ['monocart-reporter', {
      name: 'Playwright Automation Report',
      outputFile: './monocart-report/index.html'
    }]
    //Monocart report configuration End

  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: null,
    video: "on",
    screenshot: "only-on-failure",
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ['--start-maximized'], // Chrome/Edge full window
      headless: false, // Set to false if you want to see the browser UI
      // headless: true, // Set to false if you want to see the browser UI
    },

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://192.168.3.187:7071/web/login',


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',

      use: {
        // copy Desktop Chrome settings except viewport & deviceScaleFactor
        ...(() => {
          const { deviceScaleFactor, viewport, ...rest } = devices['Desktop Chrome'];
          return rest;
        })(),
        viewport: null, // keeps maximize working
        launchOptions: {
          args: ['--start-maximized'],
          headless: false, // Set to false if you want to see the browser UI
          // headless: true, // Set to true if you want to see the browser UI
        }
      },
    },



    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


// ----------------------------------------------------
// Allure report print command                       |-
// ----------------------------------------------------
// Command 1: allure generate allure-results --clean |-
// Command 2: allure open                            |-
// ----------------------------------------------------



// -----------------------------------------------------------------
// Monocart report print command                                  |-
// -----------------------------------------------------------------
// Command 1: npx monocart show-report monocart-report/index.html |-                 |-
// ----------------------------------------------------------------




