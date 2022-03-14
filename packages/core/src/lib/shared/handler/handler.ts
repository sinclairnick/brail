import { RenderFn, TemplatePage } from '../types';
import { trimSlashes } from '../constants/constants';
import { HandlerFn, HandlersMap } from './handler.types';

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
    T extends Pick<TemplatePage<any>, 'render' | 'pathName' | 'generateMeta'>
  >(
    template: T
  ) => {
    const sanitisedName = trimSlashes(template.pathName);
    const handler = this.createHandler(template);
    this.handlerMap[sanitisedName] = handler;
    console.log({ sanitisedName });
    return handler;
  };

  public static createHandler = <
    T extends Pick<TemplatePage<any>, 'generateMeta' | 'render'>
  >(
    template: T
  ) => {
    const { render, generateMeta } = template;
    const handler: HandlerFn = (req, res) => {
      const body: { [key: string]: any } = req.body;
      const props = body['data'];

      const meta = generateMeta(props);

      // TODO: Validate/sanitise body
      const { html, errors } = render({
        props: body['data'],
      });
      res.status(200).json({
        html,
        meta,
      });
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
