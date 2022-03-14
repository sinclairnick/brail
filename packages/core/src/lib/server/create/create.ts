import { HandlerManager } from '../../shared/handler/handler';
import { HandlerFn } from '../../shared/handler/handler.types';
import { Logger } from '../../shared/logger/logger';
import { TemplatePage } from '../../shared/types';

const logHandlers = () => {
  const handlerKeys = HandlerManager.getKeys();
  if (handlerKeys.length === 0) {
    Logger.warn('Found no email templates!');
    return;
  }

  Logger.log(`Found ${handlerKeys.length} email templates`);
  handlerKeys.forEach((key) => {
    Logger.log(` -/${key}`);
  });
};

export function createServer(suppliedTemplates?: TemplatePage<any>[]) {
  HandlerManager.extendHandlers(suppliedTemplates ?? []);
  logHandlers();

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
