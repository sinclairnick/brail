import { HandlerManager } from '../shared/handler/handler';
import { TemplatePage } from '../shared/types';
import { HandlerFn } from '../shared/handler/types';

export function createServer(suppliedTemplates?: TemplatePage<any>[]) {
  HandlerManager.extendHandlers(suppliedTemplates ?? []);

  const handlerKeys = HandlerManager.getKeys();
  console.log(`Found ${handlerKeys.length} handlers`);

  const rootHandler: HandlerFn = async (req, res) => {
    const url = req.url;

    if (url === undefined) {
      res.status(500).end();
      return;
    }

    const handlerNameRaw = url.replace('/api', '');
    const handler = HandlerManager.retrieve(handlerNameRaw);

    if (handler === undefined) {
      console.warn('Handler not found');
      res.status(404).end();
      return;
    }

    await handler(req, res);
  };

  return rootHandler;
}
