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
  private outPath: string;
  private outDir: string;

  constructor(private config: BrailConfig) {
    this.outPath = this.config.paths.templatesFile;
    this.outDir = path.dirname(this.outPath);

    console.log(`💌 - Templates will be written to ${chalk.green(this.outPath)}`);
  }

  private lastEmitFile: string | undefined;

  private run() {
    const templates = getTemplates();
    const flattenedTemplates = flattenTemplateRecord(templates);

    const exportObj = templatesToObject(flattenedTemplates);

    const importData = templatesToImportData(flattenedTemplates, this.outDir);

    const fileStr = createTemplatesFile({
      exportObj,
      imports: importData,
      lang: this.config.lang,
    });

    if (fileStr === this.lastEmitFile) return;

    this.lastEmitFile = fileStr;
    try {
      fs.mkdirSync(this.outDir, { recursive: true });
    } catch (e: any) {
      if (e.code === "EEXIST") return;
      throw e;
    }
    fs.writeFileSync(this.outPath, fileStr);
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
