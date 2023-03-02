import { AnyCreateTemplateReturn, AnyTemplateMap } from "@brail/types";
import { TemplateFolder, TemplateItem, TemplateList } from "./file-tree.types";

const pascalCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[\s_]+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const isTemplate = (
  template: unknown
): template is AnyCreateTemplateReturn => {
  return (
    typeof template === "function" &&
    "_def" in template &&
    "render" in template &&
    "view" in template
  );
};

const parseItem = (
  item: AnyTemplateMap | AnyCreateTemplateReturn,
  key: string,
  path: string
): TemplateItem | TemplateFolder | undefined => {
  if (isTemplate(item)) {
    let label = item.title;
    if (!label && key != null) label = pascalCase(key);
    if (!label) label = "Untitled template";
    return {
      type: "item",
      label,
      template: item,
      objectPath: path,
      urlPath: item.__path,
    };
  }
  const folder: TemplateFolder = {
    type: "folder",
    label: pascalCase(key ?? "Untitled folder"),
    children: [],
  };
  for (const [key, value] of Object.entries(item ?? {})) {
    const _path = `${path}.${key}`;
    const parsed = parseItem(value, key, _path);
    if (parsed) {
      folder.children.push(parsed);
    }
  }
  folder.children.sort((a, b) => (a.label > b.label ? 1 : -1));
  return folder;
};

export const createTemplateTree = (templates: AnyTemplateMap) => {
  const templateList: TemplateList = [];

  const entries = Object.entries(templates);
  for (const [key, mapOrTemplate] of entries) {
    const path = key;
    const parsed = parseItem(mapOrTemplate, key, path);
    if (parsed) {
      templateList.push(parsed);
    }
  }

  return templateList;
};
