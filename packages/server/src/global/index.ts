import { TemplateRecord } from "./global.types";

export type BrailStore = {
  templates: TemplateRecord;
};

declare namespace globalThis {
  export let __brail: BrailStore;
}

if (!globalThis.__brail) {
  globalThis.__brail = { templates: {} };
}

export const registerTemplates = (templates: TemplateRecord) => {
  globalThis.__brail.templates = templates;
};

export const getTemplates = () => {
  return globalThis.__brail.templates;
};
