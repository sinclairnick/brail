import { CreateTemplateReturn } from '../../types';
import { Logger } from '../util/logging.util';
import { BrailApp, CreateAppOptions, HttpMethod } from './app.types';
import { getIntrospectionRoutes } from './routes/introspection';
import { getOpenApiRoutes } from './routes/open-api';
import { getTemplateRoutes } from './routes/templates';

export const createBailApp = (
  templates: CreateTemplateReturn<any>[],
  options?: CreateAppOptions
): BrailApp => {
  if (options?.disableLogging) {
    Logger.disable();
  }

  const templateRoutes = getTemplateRoutes({
    templates,
    onSend: options?.onSend,
  });
  const introspectionRoutes = getIntrospectionRoutes({
    templates,
    onSend: options?.onSend,
  });

  const openApiRoutes = getOpenApiRoutes(
    {
      routes: [...templateRoutes, ...introspectionRoutes],
    },
    { isEnabled: !options?.disableOpenApi }
  );

  const routes = [...templateRoutes, ...introspectionRoutes, ...openApiRoutes];

  const app: BrailApp = {
    handle: async (req, res) => {
      const path = req.url;

      if (path == null) return res.status(404).end();
      const method = req.method as HttpMethod;

      // Remove everything after query start
      const cleanedPath = path.replace(/\?.*/, '');

      const firstMatch = routes.find((route) =>
        route.matchRoute(cleanedPath, method)
      );

      if (firstMatch == null) return res.status(404).end();

      await firstMatch.handler(req, res);
    },
  };

  return app;
};
