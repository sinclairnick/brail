import {
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
} from 'routing-controllers';
import { CreateTemplateReturn } from '../types/template.types';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
import type { Express } from 'express';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Logger } from './logging.util';
import chalk from 'chalk';

class Meta {
  @IsString()
  @IsOptional()
  subject?: string | null;
  @IsString()
  @IsOptional()
  preview?: string | null;
}
class BrailResponse {
  @IsString()
  html: string;
  @ValidateNested()
  @Type(() => Meta)
  meta: Meta;
}

export const createControllers = (templates: CreateTemplateReturn<any>[]) => {
  return templates.map((t) => {
    const { propType } = t;
    const operationName = t.templateName();
    const pathName = t.path();

    Logger.log(
      `Registered template ${chalk.green.bold(operationName)} (${pathName}).`
    );

    @Controller(pathName)
    class _Controller {
      @Post()
      @ResponseSchema(BrailResponse)
      async [operationName](
        @Body({ type: propType, required: true, validate: true })
        _body: typeof propType
      ): Promise<any> {
        const { html } = t.render(_body, {});
        const meta = t.meta(_body);
        return { html, meta };
      }
    }

    return _Controller;
  });
};

export const generateOpenApiSpec = (
  controllers: ReturnType<typeof createControllers>
) => {
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(
    storage,
    {
      controllers,
      routePrefix: '/api',
      validation: true,
    },
    { info: { title: 'Brail' }, components: { schemas } }
  );

  @Controller('/')
  class OpenApiController {
    @Post('openapi.json')
    getOpenApiSchema() {
      return spec;
    }
  }

  Logger.log('Open API endpoint enabled. POST /api/openapi.json.');

  return { spec, OpenApiController };
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

  const appControllers = createControllers(templates);

  let controllers = appControllers;

  if (!options?.disableOpenApi) {
    const { OpenApiController } = generateOpenApiSpec(appControllers);
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
  });

  Logger.log('Brail app initialization complete.');

  return app;
};
