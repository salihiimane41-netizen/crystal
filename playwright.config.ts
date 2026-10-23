import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  ...(process.env.PLAYWRIGHT_BASE_URL ? { testMatch: "site.spec.ts" } : {}),
  fullyParallel: true,
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3010",
    headless: true,
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
      args: ["--no-sandbox"],
    },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run start -- --port 3010",
        url: "http://127.0.0.1:3010",
        reuseExistingServer: false,
        timeout: 60_000,
      },
});
