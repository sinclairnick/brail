import { WebpackPluginFunction } from "webpack";
import { registerTemplates } from "../../../../global/index";
import { BrailConfig } from "../../types";
import {
  getTemplatePages,
  pageListToRecord,
} from "./collect-templates.constants";
import path from "node:path";

const PLUGIN_NAME = "BrailCollectTemplatesPlugin";

export class BrailCollectTemplatesPlugin {
  constructor(private config: BrailConfig) {}

  apply: WebpackPluginFunction = (compiler) => {
    // Collects all template file paths
    compiler.hooks.compile.tap(PLUGIN_NAME, (compilation) => {
      const pagesDir = path.join(this.config.paths.rootDir, "pages");
      const pages = getTemplatePages(pagesDir, this.config);
      const record = pageListToRecord(pages);
      registerTemplates(record);
    });
  };
}
