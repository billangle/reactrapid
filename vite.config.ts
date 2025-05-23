import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@", // Define the alias
        replacement: path.resolve(__dirname, "src"), // Point @ to the src directory
      },
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      },
      {
        find: "@pets/styles",
        replacement: "./src/styles/index.scss",
      },
      {
        find: "@pets/colors",
        replacement: "./src/styles/helpers/_colors.scss",
      },
    ],
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setupTests.ts",
  },
});

export default mergeConfig(viteConfig, vitestConfig);
