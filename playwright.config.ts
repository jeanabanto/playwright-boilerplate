import { defineConfig, devices } from "@playwright/test";

const envType = !process.env.ENVIRONMENT ? "localhost" : process.env.ENVIRONMENT.toString();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config({ path: `./config/.env.${envType}` });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    // globalSetup: require.resolve("./global-setup"),
    /* Timeout for each test, includes test, hooks and fixtures */
    timeout: 60 * 1000,
    /* Timeout for each assertion */
    expect: {
        timeout: 30 * 1000,
    },
    testDir: "./tests",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        // All requests we send go to this API endpoint.
        baseURL: process.env.BASE_URL || "https://localhost:3000", // default to stable environment if not specified.
        extraHTTPHeaders: {
            // We set this header per web guidelines.
            Accept: "application/json",
            // Add authorization token to all requests.
            // Assuming personal access token available in the environment.
            Authorization: `Basic ${Buffer.from(
                `${process.env.USER_ADMIN_USERNAME}:${process.env.USER_ADMIN_PASSWORD}`
            ).toString("base64")}`,
        },
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
        // screenshot: 'only-on-failure',
        // video: 'retain-on-failure',
    },

    /* Configure projects for major browsers */
    projects: [
        // Setup project
        // { name: "setup", testMatch: /.*\.setup\.ts/ },
        {
            name: "api",
            testMatch: "**/*.api.spec.ts",
            use: {
                headless: true,
                screenshot: "off",
                video: "off",
                // // Use prepared auth state.
                // storageState: ".auth/user.json",
            },
        },
        {
            name: "ui-chrome",
            use: {
                channel: "chrome",
            },
        },
        // {
        //   name: 'chromium',
        //   use: { ...devices['Desktop Chrome'] },
        // },

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
        //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
