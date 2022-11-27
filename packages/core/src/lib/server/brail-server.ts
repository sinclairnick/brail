import { CreateTemplateReturn } from '../types/template.types';
import { createBailApp } from './create-app';
import * as Introspection from './routes/introspection';
import * as OpenApi from './routes/openapi';
import * as Templates from './routes/templates';
import { CreateAppOptions } from './util/util.types';
import { match } from 'ts-pattern';
import { NextRequest } from 'next/server';

export type CreateServerOptions = {} & CreateAppOptions;

export function createServer(
  templates: CreateTemplateReturn<any>[],
  options?: CreateServerOptions
) {
  const app = createBailApp(templates, options);

  const introspectionHandler = Introspection.createIntrospectionHandler(
    app.registeredTemplates
  );
  const openApiHandler = OpenApi.createOpenApiHandler(app.spec);
  const templateHandler = Templates.createTemplatesHandler(
    app.registeredTemplates
  );

  return (req: NextRequest) => {
    const url = new URL(req.url);
    const path = url.pathname;

    if (path == null) {
      return new Response(undefined, {
        status: 404,
      });
    }

    return match(path)
      .when(
        (path) => path === Introspection.ROUTE_NAME,
        () => {
          if (options?.disableIntrospection) {
            return new Response(undefined, {
              status: 404,
            });
          }
          return introspectionHandler(req);
        }
      )
      .when(
        (path) => path === OpenApi.ROUTE_NAME,
        () => {
          if (options?.disableOpenApi) {
            return new Response(undefined, {
              status: 404,
            });
          }
          return openApiHandler(req);
        }
      )
      .when(
        (path) => Templates.ROUTE_REGEX.test(path),
        () => {
          return templateHandler(req);
        }
      )
      .otherwise(() => {
        return new Response(undefined, {
          status: 404,
        });
      });
  };
}
