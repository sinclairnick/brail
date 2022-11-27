import { CreateTemplateReturn } from '../types';
import { stripTrailingSlashes } from './util/path.util';
import { startCase } from './util/text.util';
import { BrailResponse, RenderOptions } from './util/util.types';

export type RegisteredTemplate = {
  apiPath: string;
  operationName: string;
  query: new (...args: any[]) => any;
  body: new (...args: any[]) => any;
  response: new (...args: any[]) => any;
  template: CreateTemplateReturn<any>;
  pathName: string;
};

export const registerTemplates = (
  templates: CreateTemplateReturn<any>[]
): Record<string, RegisteredTemplate> => {
  const registeredTemplates: Record<string, RegisteredTemplate> = {};

  for (const t of templates) {
    const { propType } = t;
    const operationName = startCase(t.templateName()).replace(/ +/, '');
    const pathName = stripTrailingSlashes(t.path());

    const apiPath = `/api/templates/${pathName}`;

    registeredTemplates[apiPath] = {
      apiPath,
      operationName,
      template: t,
      pathName,
      response: BrailResponse,
      body: propType,
      query: RenderOptions,
    };
  }

  return registeredTemplates;
};
