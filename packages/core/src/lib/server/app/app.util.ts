import {
  OpenAPI,
  ResponseSchema,
  routingControllersToSpec,
} from 'routing-controllers-openapi';
import {
  Controller,
  Post,
  Body,
  getMetadataArgsStorage,
  createExpressServer,
  Get,
  QueryParams,
} from 'routing-controllers';
import { CreateTemplateReturn } from '../../types/template.types';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
// @ts-ignore
import { defaultMetadataStorage } from 'class-transformer/cjs/storage.js';
import type { Express } from 'express';
import { Logger } from '../logging.util';
import chalk from 'chalk';
import { stripTrailingSlashes } from '../path.util';
import { BrailResponse, RenderOptions } from './app.types';
import { classToJsonSchema } from './json-schema/json-schema.util';
import { SchemaObject } from 'openapi3-ts';
import startCase from 'lodash/startCase';

export const registerTemplates = (templates: CreateTemplateReturn<any>[]) => {
  class Original {}
  let currentClass = Original;

  // Manually setting schema on this object so all schema are flat,
  // to reduce naming conflict issues
  let schema: Record<string, SchemaObject> = {};

  for (const t of templates) {
    const { propType } = t;
    const operationName = startCase(t.templateName()).replace(/ +/, '');
    const pathName = stripTrailingSlashes(t.path());

    Logger.log(
      `Registered (props: ${chalk.cyan(propType.name)}) => <${chalk.green.bold(
        t.templateName()
      )} /> (/api/templates/${pathName}).`
    );

    const bodySchema = classToJsonSchema(propType);
    schema[propType.name] = bodySchema;

    @Controller(`/templates`)
    class TemplatesController extends currentClass {
      @OpenAPI((source) => ({
        ...source,
        operationId:
          source.operationId?.replace('TemplatesController.', '') ??
          t.templateName(),
      }))
      @Post('/' + pathName)
      @ResponseSchema(BrailResponse)
      async [operationName](
        @QueryParams({ required: false, type: RenderOptions })
        options: RenderOptions,
        @Body({ type: propType, required: true, validate: true })
        _body: typeof propType
      ): Promise<BrailResponse> {
        Logger.log(
          `Generating email from template: ${chalk.green.bold(
            t.templateName()
          )}`
        );
        const { html, errors } = t.render(_body, options);
        const meta = t.meta?.(_body);
        return { html, meta: { ...meta }, errors };
      }
    }
    currentClass = TemplatesController;
  }

  return { controller: currentClass, schema };
};

export const generateOpenApiSpec = (
  controllers: Function[],
  flattenedSchema: Record<string, SchemaObject>
) => {
  const getSpec = () => {
    const allSchema = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    // Picking off only a select few schemas
    const selectedSchemas = {
      RenderOptions: allSchema['RenderOptions'],
      RenderError: allSchema['RenderError'],
      Meta: allSchema['Meta'],
      BrailResponse: allSchema['BrailResponse'],
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(
      storage,
      {
        controllers,
        routePrefix: '/api',
        validation: true,
      },
      {
        info: { title: 'Brail', version: '1.0' },
        components: {
          schemas: {
            ...selectedSchemas,
            ...flattenedSchema,
          },
        },
      }
    );

    return spec;
  };

  @Controller('/')
  class OpenApiController {
    @Post('openapi.json')
    getOpenApiSchema_post() {
      return getSpec();
    }

    @Get('openapi.json')
    getOpenApiSchema() {
      return getSpec();
    }
  }

  Logger.log('Open API endpoint enabled. GET/POST /api/openapi.json.');

  return { OpenApiController, getSpec };
};

/** Controller is used for meta/introspecting the templates */
const createIntrospectionController = (
  templates: CreateTemplateReturn<any>[]
) => {
  @Controller('/__introspect')
  class IntrospectionController {
    @Get('/templates')
    getTemplates() {
      return templates.map((template) => {
        return {
          name: template.templateName(),
          path: template.path(),
        };
      });
    }
  }

  Logger.log('Introspection controller mapped to /api/__introspect');

  return IntrospectionController;
};

export type CreateAppOptions = {
  /** Disables broadcasting an open api endpoint */
  disableOpenApi?: boolean;
  /**
   *  Disables broadcasting introspection endpoints.
   *  If disabled,features like BrailLayout (@brail/web) may break.
   */
  disableIntrospection?: boolean;
  /** Disable all brail-internal logging */
  disableLogging?: boolean;
};

export const createApp = (
  templates: CreateTemplateReturn<any>[],
  options?: CreateAppOptions
) => {
  if (options?.disableLogging) {
    Logger.disable();
  }

  const { controller, schema } = registerTemplates(templates);
  let controllers = [controller];

  if (!options?.disableOpenApi) {
    const { OpenApiController } = generateOpenApiSpec(controllers, schema);
    controllers = controllers.concat(OpenApiController);
  }

  if (!options?.disableIntrospection) {
    const introspectionController = createIntrospectionController(templates);
    controllers = controllers.concat(introspectionController);
  }

  const app: Express = createExpressServer({
    controllers,
    routePrefix: '/api',
    validation: true,
    classTransformer: true,
    classToPlainTransformOptions: {
      excludeExtraneousValues: true,
    },
  });

  Logger.log('Brail app initialization complete.');

  return app;
};
