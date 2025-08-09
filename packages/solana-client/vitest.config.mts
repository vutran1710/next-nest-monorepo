import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.int.test.ts"],
    testTimeout: 60_000, // Solana RPC can be slow sometimes
    hookTimeout: 60_000,
    retry: 2, // flaky network? retry
    reporters: ["dot"],
  },
});
