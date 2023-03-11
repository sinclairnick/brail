import type { LoaderDefinitionFunction } from "webpack";
import {
  extractFileParts,
  isIgnored,
  isValidExtension,
  stripExt,
  stripIndex,
} from "../util";
import { BrailConfig } from "../types";
import path from "node:path";
import { TemplateProperties } from "@brail/types";

const TEMPLATE_VARNAME = "__brailTemplate";
const PATH_PROPERTY_NAME: keyof Pick<TemplateProperties, "__path"> = "__path";
const EXPORT_DEFAULT_REGEX = /^\s?export\s+default/im;

const loader: LoaderDefinitionFunction<BrailConfig> = function (this, content) {
  const config = this.getOptions();
  const fPath = this.resourcePath;
  const lastPart = fPath.split("/").slice(-1)[0];
  const { fname, ext } = extractFileParts(lastPart);

  if (isIgnored(fname) || !isValidExtension(ext, config.templateExtensions)) {
    return content;
  }

  if (!EXPORT_DEFAULT_REGEX.test(content)) {
    // Bail early if no default export
    return content;
  }

  const pagesDir = path.join(config.paths.rootDir, "pages");
  let urlPath = fPath.replace(pagesDir, "");
  urlPath = stripExt(urlPath, config.templateExtensions);
  urlPath = stripIndex(urlPath);

  // Replace default export with variable
  const originalContent = content.replace(
    EXPORT_DEFAULT_REGEX, // 'export default' with lenient spacing
    `const ${TEMPLATE_VARNAME} = `
  );

  this.addDependency(config.paths.templatesFile);

  return (
    `${originalContent}\n\n` +
    `${TEMPLATE_VARNAME}.${PATH_PROPERTY_NAME} = "${urlPath}"\n\n` +
    `export default ${TEMPLATE_VARNAME}`
  );
};

export default loader;
