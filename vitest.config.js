import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setupTests.js"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "./coverage",
      thresholds: {
        // <- exige mínimos
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
