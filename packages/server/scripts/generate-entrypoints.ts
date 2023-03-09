import fs from "node:fs";
import path from "node:path";

const main = async () => {
  const pkgString = fs.readFileSync("package.json", "utf-8");
  const pkgJson: { files: any[]; exports: {}; entrypoints: string[] } =
    JSON.parse(pkgString);

  for (const entrypoint of pkgJson.entrypoints) {
    const dtsPath = path.join(process.cwd(), `${entrypoint}.d.ts`);
    const jsPath = path.join(process.cwd(), `${entrypoint}.js`);

    fs.writeFileSync(dtsPath, `export * from "./dist/${entrypoint}";`);
    fs.writeFileSync(
      jsPath,
      `module.exports = require("./dist/${entrypoint}.js");`
    );

    pkgJson.files.push(`${entrypoint}.d.ts`, `${entrypoint}.js`);

    pkgJson.exports[`./${entrypoint}`] = {
      require: `./dist/${entrypoint}.js`,
      import: `./dist/${entrypoint}.mjs`,
      types: `./dist/${entrypoint}.d.ts`,
      default: `./dist/${entrypoint}.js`,
    };

    console.log("Generated endpoint ", entrypoint);
  }

  fs.writeFileSync("package.json", JSON.stringify(pkgJson, null, 2));

  console.log("Generated endpoints");
};

main();
