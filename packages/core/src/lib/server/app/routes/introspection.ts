import { CreateTemplateReturn } from '../../../types';
import { Logger } from '../../util/logging.util';
import { stripTrailingSlashes } from '../../util/path.util';
import { Route } from '../app.types';

export const getIntrospectionRoutes = (
  templates: CreateTemplateReturn<any>[],
  opts?: { isEnabled?: boolean }
): Route[] => {
  const { isEnabled = true } = opts ?? {};
  if (!isEnabled) {
    Logger.log(
      'Introspection has been disabled. Brail Web UI may be affected.'
    );
    return [];
  }

  const templatesList = templates.map((x) => {
    return {
      name: x.templateName(),
      path: x.path().replace('/api/templates', ''),
    };
  });

  const routes: Route[] = [
    {
      handler: (req, res) => {
        res.json(templatesList);
      },
      matchRoute: (name) => name === '/api/__introspect/templates',
    },
  ];

  return routes;
};
