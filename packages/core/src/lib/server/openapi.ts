import chalk from 'chalk';
import {
  OpenApiBuilder,
  ParameterObject,
  PathItemObject,
  SchemaObject,
} from 'openapi3-ts';
import { Logger } from './util/logging.util';
import {
  BrailResponse,
  Meta,
  RenderError,
  RenderOptions,
} from './util/util.types';
import { classToJsonSchema } from './util/json-schema.util';
import { RegisteredTemplate } from './templates';

const DEFAULT_PARAMETERS: ParameterObject[] = [
  {
    in: 'query',
    name: 'beautify',
    schema: {
      type: 'boolean',
    },
  },
  {
    in: 'query',
    name: 'validationLevel',
    schema: {
      enum: ['strict', 'soft', 'skip'],
      type: 'string',
    },
  },
  {
    in: 'query',
    name: 'keepComments',
    schema: {
      type: 'boolean',
    },
  },
  {
    in: 'query',
    name: 'minify',
    schema: {
      type: 'boolean',
    },
  },
];

export const getSpec = (templates: Record<string, RegisteredTemplate>) => {
  const builder = new OpenApiBuilder({
    info: { title: 'Brail', version: '1.9' },
    openapi: '3.0.0',
    paths: {},
    components: { schemas: {} },
  });

  builder.addSchema(RenderOptions.name, classToJsonSchema(RenderOptions));
  builder.addSchema(RenderError.name, classToJsonSchema(RenderError));
  builder.addSchema(Meta.name, classToJsonSchema(RenderError));
  builder.addSchema(BrailResponse.name, classToJsonSchema(RenderError));

  // Manually setting schema on this object so all schema are flat,
  // to reduce naming conflict issues
  let schema: Record<string, SchemaObject> = {};

  for (const key in templates) {
    const t = templates[key];
    const { apiPath, body, operationName, pathName, template, response } = t;

    Logger.log(
      `Registered (props: ${chalk.cyan(body.name)}) => <${chalk.green.bold(
        t.operationName
      )} /> (/api/templates/${pathName}).`
    );

    const bodySchema = classToJsonSchema(body);

    if (body.name !== 'UnknownType' && schema[body.name] != null) {
      Logger.warn(
        `Found multiple prop types with the same name: ${chalk.cyan(
          body.name
        )}. \n` +
          Logger.indent(
            `Please consider making all prop types unique to avoid conflicts or overwriting.`
          )
      );
    }
    schema[body.name] = {
      /**
       * Ensures the type will always be an object, preventing unintended behaviour
       * when e.g. object has no properties.
       * */
      type: 'object',
      properties: {},
      required: [],
      ...bodySchema,
    };

    builder.addSchema(body.name, schema[body.name]);

    const hasProperties = (schema[body.name].required?.length ?? 0) > 0;

    const pathOpts: PathItemObject = {
      post: {
        operationId: operationName,
        parameters: DEFAULT_PARAMETERS,
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: `#/components/schemas/${body.name}`,
              },
            },
          },
          description: body.name,
          required: hasProperties,
        },
        responses: {
          '200': {
            content: {
              'text/html; charset=utf-8': {
                schema: {
                  $ref: `#/components/schemas/${response.name}`,
                },
              },
            },
            description: response.name,
          },
        },
      },
    };

    builder.addPath(apiPath, pathOpts);
  }

  return builder.getSpec();
};
