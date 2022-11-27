import { CreateTemplateReturn } from '../types/template.types';
import { createBailApp } from './create-app';
import * as Introspection from './routes/introspection';
import * as OpenApi from './routes/openapi';
import * as Templates from './routes/templates';
import { CreateAppOptions } from './util/util.types';
import { match } from 'ts-pattern';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

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

  return (req: NextApiRequest, res: NextApiResponse) => {
    const path = req.url;

    if (path == null) {
      res.status(404).end();
      return;
    }

    return match(path)
      .when(
        (path) => path === Introspection.ROUTE_NAME,
        () => {
          if (options?.disableIntrospection) {
            if (options?.disableOpenApi) {
              res.status(404).end();
              return;
            }
          }
          return introspectionHandler(req, res);
        }
      )
      .when(
        (path) => path === OpenApi.ROUTE_NAME,
        () => {
          if (options?.disableOpenApi) {
            res.status(404).end();
            return;
          }
          return openApiHandler(req, res);
        }
      )
      .when(
        (path) => Templates.ROUTE_REGEX.test(path),
        () => {
          return templateHandler(req, res);
        }
      )
      .otherwise(() => {
        res.status(404).end();
      });
  };
}
