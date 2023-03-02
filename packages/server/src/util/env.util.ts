import fs from "node:fs";
import path from "node:path";

export const detectLang = () => {
  const tsConfigPath = path.join(process.cwd(), "tsconfig.json");
  const hasTsConfig = fs.existsSync(tsConfigPath);

  return hasTsConfig ? "ts" : "js";
};

export const hasSrc = () => {
  const srcPath = path.join(process.cwd(), "src");
  const hasSrcFolder = fs.existsSync(srcPath);

  return hasSrcFolder;
};
