import { getNextManifest } from '../next';
import { EmailTemplate, RenderFn } from '../template/types';
import { HandlerFn, HandlersMap } from './server.types';

const trimSlashes = (str: string) => {
  return str
    .split(/\/+/)
    .filter((x) => x === undefined || x.length === 0)
    .join('/');
};

export const createHandler = (renderFn: RenderFn<any>) => {
  const handler: HandlerFn = (req, res) => {
    const body: { [key: string]: any } = req.body;

    // TODO: Validate/sanitise body
    const { html, errors } = renderFn({
      props: body['data'],
    });

    res.setHeader('content-type', 'text/html');
    res.status(200);
    res.send(html);
    return;
  };

  return handler;
};

export const createServer = (templates: EmailTemplate<any>[] = []) => {
  const rootHandler: HandlerFn = async (req, res) => {
    const manifest = await getNextManifest();
    console.log('MANIFEST', manifest);
    console.log(`Found ${templates} templates`);

    const handlers = templates.reduce((obj: HandlersMap, t) => {
      const sanitisedName = trimSlashes(t.name);
      return { ...obj, [sanitisedName]: t.handler };
    }, {});

    const url = req.url;

    if (url === undefined) {
      res.status(500).end();
      return;
    }

    const handlerNameRaw = url.replace('/api', '');
    const handlerName = trimSlashes(handlerNameRaw);

    const handler = handlers[handlerName];

    if (handler === undefined) {
      console.warn('Handler not found');
      res.status(404).end();
      return;
    }

    await handler(req, res);
  };

  return rootHandler;
};
