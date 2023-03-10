import { Page, TemplateRecord } from "../../../../global/global.types";
import { BrailConfig } from "../../types";
import fs from "node:fs";
import path from "node:path";
import { extractFileParts, isIgnored, isValidExtension } from "../../util";
import { camelCase } from "../../../../util/string.util";

export const getTemplatePages = (
  cwd: string,
  config: Pick<BrailConfig, "templateExtensions">
): Page[] => {
  const pages: Page[] = [];

  const files = fs.readdirSync(cwd);

  for (const file of files) {
    const fpath = path.join(cwd, file);
    const isDir = fs.statSync(fpath).isDirectory();

    if (isDir) {
      if (isIgnored(file)) continue;

      pages.push({
        path: fpath,
        type: "dir",
        key: fpath.split("/").slice(-1)[0],
        children: getTemplatePages(fpath, config),
      });

      continue;
    }

    const { ext, fname } = extractFileParts(file);
    const key = camelCase(fname);

    if (isIgnored(fname)) continue;
    if (!isValidExtension(ext, config.templateExtensions)) continue;

    pages.push({ type: "file", path: fpath, key });
  }
  return pages;
};

export const pageListToRecord = (pages: Page[]): TemplateRecord => {
  const templates: TemplateRecord = pages.reduce(
    (obj: TemplateRecord, page) => {
      if (page.type === "dir") {
        obj[page.key] = {
          type: "record",
          value: pageListToRecord(page.children),
        };
        return obj;
      }
      obj[page.key] = page;
      return obj;
    },
    {}
  );
  return templates;
};
