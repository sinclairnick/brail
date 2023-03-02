import { AnyTemplateMap } from "@brail/types";
import { AnyCreateTemplateReturn } from "@brail/types";

export type FileTreeProps = {
  templates: AnyTemplateMap;
};

export type TemplateItem = {
  type: "item";
  label: string;
  objectPath: string;
  urlPath: string | undefined;
  template: AnyCreateTemplateReturn;
};

export type TemplateFolder = {
  type: "folder";
  label: string;
  children: TemplateList;
};

export type TemplateList = Array<TemplateFolder | TemplateItem>;
