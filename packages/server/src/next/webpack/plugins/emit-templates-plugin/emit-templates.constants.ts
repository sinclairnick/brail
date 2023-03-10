import { PageFile, TemplateRecord } from "../../../../global/global.types";
import { camelCase, pascalCase } from "../../../../util/string.util";
import path from "node:path";
import { LANG_FILE_EXTENSIONS } from "../../util";
import { BrailConfig } from "../../types";

export type FlattenedTemplateRecord = {
  [key: string]: PageFile;
};

export const flattenTemplateRecord = (
  templateRecord: TemplateRecord,
  path = ""
): FlattenedTemplateRecord => {
  return Object.entries(templateRecord).reduce(
    (obj: FlattenedTemplateRecord, [key, value]) => {
      const _key = `${path}${key}`;
      if (value.type === "record") {
        obj = {
          ...obj,
          ...flattenTemplateRecord(value.value, `${_key}.`),
        };
        return obj;
      }

      if (value.type === "file") {
        obj[_key] = value;
      }

      return obj;
    },
    {}
  );
};

type TemplateExportObject = {
  [key: string]: TemplateExportObject | string;
};

/**
 * Converts flattened templates into a dummy object that can be stringified
 * into the exported format-ish.
 */
export const templatesToObject = (
  templates: FlattenedTemplateRecord
): TemplateExportObject => {
  const obj: TemplateExportObject = {};

  for (const objPath in templates) {
    const parts = objPath.split(".");

    let current: Record<string, any> = obj;
    for (const part of parts) {
      const isLast = part === parts[parts.length - 1];

      const key = camelCase(part);

      if (!isLast) {
        current[key] = current[key] ?? {};
        current = current[key];
        continue;
      }

      current[key] = objPathToImportIdentifier(objPath);
    }
  }

  return obj;
};

export const objPathToImportIdentifier = (objPath: string) => {
  return pascalCase(objPath.split(".").join("-"));
};

export const exportObjToString = (obj: TemplateExportObject) => {
  return JSON.stringify(obj, null, 2).replace(/"/g, "");
};

export type TemplateImportData = {
  identifier: string;
  path: string;
};

export const templatesToImportData = (
  templates: FlattenedTemplateRecord,
  outDir: string
): TemplateImportData[] => {
  return Object.entries(templates)
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([objPath, page]) => {
      const cleanPath = path
        .relative(outDir, page.path)
        .replace(LANG_FILE_EXTENSIONS, "");

      return {
        identifier: objPathToImportIdentifier(objPath),
        path: cleanPath,
      };
    });
};

export const createTemplatesFile = (args: {
  imports: TemplateImportData[];
  exportObj: TemplateExportObject;
  lang: BrailConfig["lang"];
}) => {
  const { exportObj, imports, lang } = args;

  const importStr = imports
    .map((imp) => {
      if (lang === "ts") {
        return `import ${imp.identifier} from "${imp.path}";`;
      }
      return `const ${imp.identifier} = require("${imp.path}");`;
    })
    .join("\n");

  const exportObjStr = exportObjToString(exportObj);
  const exportStr =
    lang === "ts"
      ? `export const templates = ${exportObjStr};\n\nexport default templates;`
      : `exports.templates = ${exportObjStr};\n\nmodule.exports = ${exportObjStr};`;

  return `${importStr}\n\n` + `${exportStr}`;
};
