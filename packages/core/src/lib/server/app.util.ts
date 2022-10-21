import { routingControllersToSpec } from 'routing-controllers-openapi';
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
import { Express } from 'express';

class Meta {
  subject?: string | null;
  preview?: string | null;
}
class Response {
  html: string;
  meta: Meta;
}

export const createControllers = (templates: CreateTemplateReturn<any>[]) => {
  return templates.map((t) => {
    const { propType } = t;

    @Controller(t.path())
    class _Controller {
      @Post()
      handle(
        @Body({ type: propType, validate: true })
        body: typeof propType
      ): Response {
        const _body = body as any;
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
    { components: { schemas } }
  );

  @Controller('/')
  class OpenApiController {
    @Post('openapi.json')
    handle() {
      return spec;
    }
  }

  return { spec, OpenApiController };
};

export const createApp = (templates: CreateTemplateReturn<any>[]) => {
  const controllers = createControllers(templates);
  const { OpenApiController, spec } = generateOpenApiSpec(controllers);

  const app: Express = createExpressServer({
    controllers: controllers.concat(OpenApiController),
    routePrefix: '/api',
  });

  return app;
};
