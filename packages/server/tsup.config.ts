import { defineConfig } from "tsup";
import pkgJson from "./package.json";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "next-loader": "src/next/webpack/loader/index.ts",
    ...pkgJson.entrypoints.reduce((obj, entry) => {
      obj[entry] = `src/${entry}/index.ts`;
      return obj;
    }, {}),
  },
  format: ["cjs", "esm"],
  bundle: true,
  dts: true,
});
