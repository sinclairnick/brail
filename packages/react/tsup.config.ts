import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  bundle: true,
  dts: true,
  sourcemap: true,
});
