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
  QueryParam,
  QueryParams,
} from 'routing-controllers';
import { CreateTemplateReturn } from '../types/template.types';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
import type { Express } from 'express';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Logger } from './logging.util';
import chalk from 'chalk';
import { MjType } from '@brail/mjml';
import { stripeTrailingSlashes } from './path.util';

class Meta {
  @IsString()
  @IsOptional()
  subject?: string | null;

  @IsString()
  @IsOptional()
  preview?: string | null;
}

class RenderError implements MjType.MjmlError {
  @IsString()
  tagName: string;
  @IsString()
  message: string;
  @IsInt()
  line: number;
  @IsString()
  formattedMessage: string;
}
class BrailResponse {
  @IsString()
  html: string;

  @ValidateNested()
  @Type(() => Meta)
  meta: Meta;

  @ValidateNested({ each: true })
  @Type(() => RenderError)
  errors: RenderError[];
}

enum ValidationLevel {
  Strict = 'strict',
  Soft = 'soft',
  Skip = 'skip',
}

class RenderOptions {
  @IsBoolean()
  @IsOptional()
  beautify?: boolean;

  @IsEnum(ValidationLevel)
  @IsOptional()
  validationLevel?: 'skip';

  @IsOptional()
  @IsBoolean()
  keepComments?: boolean;

  @IsBoolean()
  @IsOptional()
  minify?: boolean;
}

export const createControllers = (templates: CreateTemplateReturn<any>[]) => {
  return templates.map((t) => {
    const { propType } = t;
    const operationName = t.templateName();
    const pathName = stripeTrailingSlashes(t.path());

    Logger.log(
      `Registered template ${chalk.green.bold(
        operationName
      )} (/api/templates/${pathName}).`
    );

    @Controller(`/templates/${pathName}`)
    class Base {
      @Post()
      @ResponseSchema(BrailResponse)
      async [operationName](
        @QueryParams({ required: false, type: RenderOptions })
        options: RenderOptions,
        @Body({ type: propType, required: true, validate: true })
        _body: typeof propType
      ): Promise<BrailResponse> {
        Logger.log(
          `Generating email from template: ${chalk.green.bold(operationName)}`
        );
        const { html, errors } = t.render(_body, options);
        const meta = t.meta?.(_body);
        return { html, meta: { ...meta }, errors };
      }
    }

    const className =
      operationName.slice(0, 1).toUpperCase() +
      operationName.slice(1) +
      'Controller';

    return Object.defineProperty(Base, 'name', {
      writable: true,
      value: className,
    });
  });
};

export const generateOpenApiSpec = (
  controllers: ReturnType<typeof createControllers>
) => {
  const getSpec = () => {
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

    return spec;
  };

  @Controller('/')
  class OpenApiController {
    @Get('openapi.json')
    @Post('openapi.json')
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

  const appControllers = createControllers(templates);

  let controllers = appControllers;
  let spec: any | undefined;

  if (!options?.disableOpenApi) {
    const { OpenApiController, getSpec } = generateOpenApiSpec(appControllers);
    controllers = controllers.concat(OpenApiController);
    spec = getSpec();
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

  console.log(app._router);

  Logger.log('Brail app initialization complete.');

  return app;
};
