import { BrailTemplate, TemplateMap } from './types/template.types';




export const createServer = (templates: TemplateMap) => {
  const registerTemplate = <Name extends string>(
    name: Name,
    path: `/${string}`,
    template: BrailTemplate<unknown, unknown>
  ) => {
    const getKey = `get${name}` as const;
  };

  const recursivelyRegisterTemplates = (templates: TemplateMap) => {};
};
