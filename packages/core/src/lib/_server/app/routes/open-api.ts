import chalk from 'chalk';
import { OpenAPIObject } from 'openapi3-ts';
import { BrailResponse, RenderOptions } from '../../../types';
import { OnSendParams, WildcardJson } from '../../../types/api.types';
import { Logger } from '../../util/logging.util';
import { createParamSchemas, createSchema } from '../../util/openapi/openapi';
import { Route } from '../app.types';

/** Reused OpenAPI schema */
export const GlobalBodySchema = {
  BrailResponse,
  WildcardJson,
  OnSendParams,
};

export const GlobalParamSchema = {
  RenderOptions,
};

const DEFAULT_IGNORED = [
  'UnknownType',
  ...Object.values(GlobalBodySchema).map((x) => x.name),
  ...Object.values(GlobalParamSchema).map((x) => x.name),
];

const validateUniqueSchemaNames = (
  newSchemas: Record<string, unknown> | undefined,
  existingSchemas: Record<string, unknown> | undefined,
  ignoredNames = DEFAULT_IGNORED
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

export type GetOpenApiRoutesArgs = {
  routes: Route[];
};

export const getOpenApiRoutes = (
  args: GetOpenApiRoutesArgs,
  opts?: { isEnabled?: boolean }
) => {
  const { routes } = args;
  const { isEnabled = true } = opts ?? {};

  if (!isEnabled) {
    Logger.log('OpenAPI has been disabled. Skipping OpenAPI definitions.');
    return [];
  }

  const apiSpec: OpenAPIObject = {
    info: { title: 'Brail', version: '1.0' },
    openapi: '3.0.0',
    paths: {},
    components: {
      // Register global schema so each endpoint doesnt need to re-register
      schemas: {
        [GlobalBodySchema.BrailResponse.name]: createSchema({
          body: GlobalBodySchema.BrailResponse,
        }),
        [GlobalBodySchema.WildcardJson.name]: {
          // Specifies an object with any vars
          type: 'object',
          additionalProperties: true,
        },
        [GlobalBodySchema.OnSendParams.name]: createSchema({
          body: GlobalBodySchema.OnSendParams,
        }),
      },
      parameters: {
        ...createParamSchemas({
          in: 'query',
          schema: GlobalParamSchema.RenderOptions,
        }),
      },
    },
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
