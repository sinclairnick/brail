import { RenderFn, TemplatePage } from '../template/types';
import { HandlerFn, HandlersMap, SuppliedTemplateMap } from './server.types';

const trimSlashes = (str: string) => {
  return str
    .split(/\/+/)
    .filter((x) => x === undefined || x.length === 0)
    .join('/');
};

const handlerMap: HandlersMap = {};

const pathHasHandler = (path: string) => {
  const name = trimSlashes(path);
  const existing = handlerMap[name];

  return existing !== undefined;
};

export const registerTemplate = <T extends Pick<TemplatePage<any>, 'render'>>(
  pathName: string,
  template: T
) => {
  const sanitisedName = trimSlashes(pathName);
  const handler = createHandler(template.render);
  handlerMap[sanitisedName] = handler;
  return handler;
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

export const createServer = (suppliedTemplates?: SuppliedTemplateMap) => {
  

  
  const _suppliedTemplates = suppliedTemplates ?? {};
  for (const path in _suppliedTemplates) {
    const template = _suppliedTemplates[path];
    const handlerAlreadyExists = pathHasHandler(path);
    if (handlerAlreadyExists) {
      throw new Error(
        `A template with name ${path} has already been registered`
      );
    }
    registerTemplate(path, template);
  }

  const handlerKeys = Object.keys(handlerMap);
  console.log(`Found ${handlerKeys.length} handlers`);

  const rootHandler: HandlerFn = async (req, res) => {
    const url = req.url;

    if (url === undefined) {
      res.status(500).end();
      return;
    }

    const handlerNameRaw = url.replace('/api', '');
    const handlerName = trimSlashes(handlerNameRaw);

    const handler = handlerMap[handlerName];

    if (handler === undefined) {
      console.warn('Handler not found');
      res.status(404).end();
      return;
    }

    await handler(req, res);
  };

  return rootHandler;
};
