import { RenderFn, TemplatePage } from '../types';
import { trimSlashes } from '../constants/constants';
import { HandlerFn, HandlersMap } from './types';

export class HandlerManager {
  private static handlerMap: HandlersMap = {};

  public static hasPath = (path: string) => {
    const name = trimSlashes(path);
    const existing = this.handlerMap[name];

    return existing !== undefined;
  };

  public static retrieve = (path: string) => {
    const handlerName = trimSlashes(path);

    return this.handlerMap[handlerName];
  };

  public static registerTemplate = <
    T extends Pick<TemplatePage<any>, 'render' | 'pathName'>
  >(
    template: T
  ) => {
    const sanitisedName = trimSlashes(template.pathName);
    const handler = this.createHandler(template.render);
    this.handlerMap[sanitisedName] = handler;
    console.log({ sanitisedName });
    return handler;
  };

  public static createHandler = (renderFn: RenderFn<any>) => {
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

  public static getKeys() {
    return Object.keys(this.handlerMap);
  }

  public static extendHandlers(suppliedTemplates: TemplatePage<any>[]) {
    for (const template of suppliedTemplates ?? {}) {
      const handlerAlreadyExists = this.hasPath(template.pathName);
      if (handlerAlreadyExists) {
        throw new Error(
          `A template with name ${template.pathName} has already been registered`
        );
      }
      this.registerTemplate(template);
    }
  }
}
