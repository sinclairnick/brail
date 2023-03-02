import type { LoaderDefinitionFunction } from "webpack";
import {
  extractFileParts,
  isIgnored,
  isValidExtension,
  stripExt,
  stripLeadingSlash,
} from "./util";
import { BrailConfig } from "./types";
import path from "node:path";
import { TemplateProperties } from "@brail/types";

const TEMPLATE_VARNAME = "__brailTemplate";
const PATH_PROPERTY_NAME: keyof Pick<TemplateProperties, "__path"> = "__path";

const loader: LoaderDefinitionFunction<BrailConfig> = function (this, content) {
  const config = this.getOptions();
  const fPath = this.resourcePath;
  const lastPart = fPath.split("/").slice(-1)[0];
  const { fname, ext } = extractFileParts(lastPart);

  if (isIgnored(fname) || !isValidExtension(ext, config.templateExtensions)) {
    return content;
  }

  const pagesDir = path.join(config.paths.rootDir, "pages");
  let urlPath = fPath.replace(pagesDir, "");
  urlPath = stripExt(urlPath, config.templateExtensions);

  // Replace default export with variable
  const originalContent = content.replace(
    /^\s?export\s+default/im, // 'export default' with lenient spacing
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
