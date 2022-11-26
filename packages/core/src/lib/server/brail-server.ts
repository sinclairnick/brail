import { CreateTemplateReturn } from '../types/template.types';
import { NextApiHandler } from 'next';
import { createBailApp } from './create-app';
import * as Introspection from './routes/introspection';
import * as OpenApi from './routes/openapi';
import * as Templates from './routes/templates';
import { CreateAppOptions } from './util/util.types';

export type CreateServerOptions = {} & CreateAppOptions;

export function createServer(
  templates: CreateTemplateReturn<any>[],
  options?: CreateServerOptions
): NextApiHandler {
  const app = createBailApp(templates, options);

  const introspectionHandler = Introspection.createIntrospectionHandler(
    app.registeredTemplates
  );
  const openApiHandler = OpenApi.createOpenApiHandler(app.spec);
  const templateHandler = Templates.createTemplatesHandler(
    app.registeredTemplates
  );

  return (req, res) => {
    const path = req.url;

    if (path == null) {
      res.status(404).end();
      return;
    }

    switch (path) {
      case Introspection.ROUTE_NAME: {
        if (options?.disableIntrospection) {
          res.status(404).end();
          return;
        }
        return introspectionHandler(req, res);
      }
      case OpenApi.ROUTE_NAME: {
        if (options?.disableOpenApi) {
          res.status(404).end();
          return;
        }
        return openApiHandler(req, res);
      }
      default: {
        return templateHandler(req, res);
      }
    }
  };
}
