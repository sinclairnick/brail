import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    trpc: "src/trpc/index.ts",
    sdk: "src/sdk/index.ts",
    "next-loader": "src/next/webpack/loader.ts",
    next: "src/next/index.ts",
    devtools: "src/devtools/index.ts",
    util: "src/util/index.ts",
  },
  format: ["cjs", "esm"],
  bundle: true,
  dts: true,
});
