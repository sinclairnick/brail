import { WebpackPluginFunction } from "webpack";
import { BrailConfig } from "../types";
import { getTemplatePages, pageListToStr } from "../util";
import fs from "node:fs";
import path from "node:path";

const PLUGIN_NAME = "BrailEmitTemplatesPlugin";

export class BrailEmitTemplatesPlugin {
  constructor(private config: BrailConfig) {}

  apply: WebpackPluginFunction = (compiler) => {
    const outPath = this.config.paths.templatesFile;

    compiler.hooks.initialize.tap(PLUGIN_NAME, () => {
      // Write file on boot
      writeTemplateFile(this.config, outPath);
    });

    // Collects all template file paths and writes them to a file
    compiler.hooks.beforeCompile.tap(PLUGIN_NAME, (compilation) => {
      const modified = Array.from(
        compiler.modifiedFiles?.values() ?? []
      ).filter((x) => {
        return this.config.templateExtensions.some((ext) => x.endsWith(ext));
      });

      if (modified.length === 0) {
        return;
      }

      const isOnlyBrailFileModified =
        modified.length === 1 && modified.includes(outPath);

      if (isOnlyBrailFileModified) return;

      writeTemplateFile(this.config, outPath);
    });
  };
}

const writeTemplateFile = (config: BrailConfig, outPath: string) => {
  const pagesDir = path.join(config.paths.rootDir, "pages");
  const templatesDir = path.dirname(outPath);

  const pages = getTemplatePages(pagesDir, config);
  const templateMap = pageListToStr(templatesDir, pages);
  const fileStr = templateMap.fileString();

  try {
    fs.mkdirSync(templatesDir, { recursive: true });
  } catch (e: any) {
    if (e.code === "EEXIST") return;
    throw e;
  }

  console.log("Writing templates to", outPath);
  fs.writeFileSync(outPath, fileStr);
};
