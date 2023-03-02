import { CreateTemplateReturn } from '../../../types';
import { Logger } from '../../util/logging.util';
import { OnSendFn, Route } from '../app.types';

export type GetIntrospectionRoutesArgs = {
  templates: CreateTemplateReturn<any>[];
  onSend?: OnSendFn;
};

export const getIntrospectionRoutes = (
  args: GetIntrospectionRoutesArgs,
  opts?: {
    isEnabled?: boolean;
  }
): Route[] => {
  const { onSend, templates } = args;

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
    {
      matchRoute: (name) => name === '/api/__introspect/can-send',
      handler: (req, res) => {
        return res.json({ canSend: onSend != null });
      },
    },
    {
      matchRoute: (name) => name === '/api/__introspect/send-preview',
      handler: async (req, res) => {
        const parsedBody = JSON.parse(req.body);
        const { html, to, subject } = parsedBody;
        await onSend?.(
          {
            errors: [],
            html,
            to,
            subject,
          },
          req
        );
        res.end();
      },
    },
  ];

  return routes;
};
