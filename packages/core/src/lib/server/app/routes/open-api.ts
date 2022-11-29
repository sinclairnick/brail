import chalk from 'chalk';
import { OpenAPIObject } from 'openapi3-ts';
import { BrailResponse, RenderOptions } from '../../../types';
import { Logger } from '../../util/logging.util';
import { Route } from '../app.types';

const validateUniqueSchemaNames = (
  newSchemas: Record<string, unknown> | undefined,
  existingSchemas: Record<string, unknown> | undefined,
  ignoredNames = ['UnknownType', BrailResponse.name]
) => {
  if (newSchemas == null || existingSchemas == null) return true;

  for (const schemaName in newSchemas) {
    const nameExists = existingSchemas[schemaName] != null;
    const notIgnored = !ignoredNames.includes(schemaName);

    if (nameExists && notIgnored) {
      Logger.warn(
        `Found multiple prop types with the same name: ${chalk.cyan(
          schemaName
        )}. \n` +
          Logger.indent(
            `Please consider making all prop types unique to avoid conflicts or overwriting.`
          )
      );
      return false;
    }
  }
  return true;
};

export const getOpenApiRoutes = (
  routes: Route[],
  opts?: { isEnabled?: boolean }
) => {
  const { isEnabled = true } = opts ?? {};

  if (!isEnabled) {
    Logger.log('OpenAPI has been disabled. Skipping OpenAPI definitions.');
    return [];
  }

  const apiSpec: OpenAPIObject = {
    info: { title: 'Brail', version: '1.0' },
    openapi: '3.0.0',
    paths: {},
    components: { schemas: {} },
  };

  for (const route of routes) {
    const getSpec = route.getSpec;
    if (getSpec == null) continue;

    const spec = getSpec();

    validateUniqueSchemaNames(spec.schemas, apiSpec.components?.schemas);

    apiSpec.paths[spec.path] = {
      ...apiSpec.paths[spec.path],
      ...spec.operations,
    };

    apiSpec.components = {
      ...apiSpec.components,
      schemas: { ...apiSpec.components?.schemas, ...spec.schemas },
      parameters: { ...apiSpec.components?.parameters, ...spec.parameters },
    };
  }

  const openApiRoutes: Route[] = [
    {
      matchRoute: (name) => name === '/api/openapi.json',
      handler(req, res) {
        res.json(apiSpec);
      },
    },
  ];

  return openApiRoutes;
};
