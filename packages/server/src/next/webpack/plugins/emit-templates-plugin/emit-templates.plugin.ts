import { WebpackPluginFunction } from "webpack";
import { BrailConfig } from "../../types";
import { getTemplates } from "../../../../global/index";
import {
  createTemplatesFile,
  flattenTemplateRecord,
  templatesToImportData,
  templatesToObject,
} from "./emit-templates.constants";
import path from "node:path";
import fs from "node:fs";
import chalk from "chalk";

const PLUGIN_NAME = "BrailEmitTemplatesPlugin";

export class BrailEmitTemplatesPlugin {
  constructor(private config: BrailConfig) {}

  private lastEmitFile: string | undefined;

  private run() {
    const outPath = this.config.paths.templatesFile;
    const outDir = path.dirname(outPath);

    const templates = getTemplates();
    const flattenedTemplates = flattenTemplateRecord(templates);

    const exportObj = templatesToObject(flattenedTemplates);

    const importData = templatesToImportData(flattenedTemplates, outDir);

    const fileStr = createTemplatesFile({
      exportObj,
      imports: importData,
      lang: this.config.lang,
    });

    if (fileStr === this.lastEmitFile) return;

    this.lastEmitFile = fileStr;
    try {
      fs.mkdirSync(outDir, { recursive: true });
    } catch (e: any) {
      if (e.code === "EEXIST") return;
      throw e;
    }
    fs.writeFileSync(outPath, fileStr);
    console.log(`💌 - Templates written to ${chalk.green(outPath)}`);
  }

  apply: WebpackPluginFunction = (compiler) => {
    compiler.hooks.initialize.tap(PLUGIN_NAME, () => {
      this.run();
    });

    compiler.hooks.compilation.tap(PLUGIN_NAME, () => {
      this.run();
    });
  };
}
