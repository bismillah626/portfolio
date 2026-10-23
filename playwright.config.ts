import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  timeout: 45_000,
  use: { baseURL: "http://127.0.0.1:3101", browserName: "chromium", trace: "retain-on-failure" },
  webServer: {
    command: "npm run start -- --port 3101",
    url: "http://127.0.0.1:3101",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
