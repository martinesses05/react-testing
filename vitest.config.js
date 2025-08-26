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
      reporter: ["text", "lcov", "html"], // lcov/html para artefactos y Sonar/Coveralls si luego querés
      reportsDirectory: "./coverage",
    },
  },
});
