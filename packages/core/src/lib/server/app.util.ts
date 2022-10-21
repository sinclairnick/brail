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
} from 'routing-controllers';
import { CreateTemplateReturn } from '../types/template.types';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
import type { Express } from 'express';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Logger } from './logging.util';
import chalk from 'chalk';
import next from 'next';

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
    const operationName = propType.name.replace('Props', '');
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

export type CreateAppOptions = {
  disableOpenApi?: boolean;
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

  let controllers: any[] = [];
  if (!options?.disableOpenApi) {
    const { OpenApiController } = generateOpenApiSpec(appControllers);
    controllers = [...appControllers, OpenApiController];
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
