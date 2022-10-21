import { CreateTemplateReturn } from '../types/template.types';
import { stripeTrailingSlashes } from './path.util';

export const getTemplateMap = (templates: CreateTemplateReturn<any>[]) => {
  const map = new Map<string, CreateTemplateReturn<any>>();
  for (const template of templates) {
    const strippedPath = stripeTrailingSlashes(template.path());
    map.set(strippedPath, template);
  }
  return map;
};
