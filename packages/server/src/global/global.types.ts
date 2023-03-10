export type PageDir = {
  path: string;
  type: "dir";
  key: string;
  children: Page[];
};

export type PageFile = {
  type: "file";
  path: string;
  key: string;
};

export type Page = PageDir | PageFile;

export type TemplateRecord = {
  [key: string]: PageFile | { type: "record"; value: TemplateRecord };
};
