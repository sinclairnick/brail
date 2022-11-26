import { CreateTemplateReturn } from '../types';
import { getSpec } from './openapi';
import { registerTemplates } from './templates';
import { Logger } from './util/logging.util';
import { CreateAppOptions } from './util/util.types';

export const createBailApp = (
  templates: CreateTemplateReturn<any>[],
  options?: CreateAppOptions
) => {
  const registeredTemplates = registerTemplates(templates);
  const spec = getSpec(registeredTemplates);

  if (options?.disableLogging) {
    Logger.disable();
  }

  return { registeredTemplates, spec };
};
