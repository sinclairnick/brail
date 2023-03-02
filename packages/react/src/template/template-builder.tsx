import { createTemplate } from "./template";
import {
  AnyTemplateProps,
  AnyMeta,
  TemplateConfig,
  SchemaOf,
  RenderResult,
} from "@brail/types";

export type AnyTemplateBuilder = TemplateBuilder<any, any, any>;

function createNewBuilder<
  TProps extends AnyTemplateProps,
  TMeta extends AnyMeta,
  TRes extends any
>(config: TemplateConfig<TProps, TMeta, TRes>) {
  return new TemplateBuilder(config);
}

export class TemplateBuilder<
  TProps extends AnyTemplateProps,
  TMeta extends AnyMeta,
  TRes extends any
> {
  public readonly _config: TemplateConfig<TProps, TMeta, TRes> = {
    _def: {
      _meta: undefined as any,
      _props: undefined as any,
      _res: undefined as any,
    },
    title: undefined,
    schema: { Meta: undefined, Props: undefined, SendResponse: undefined },
    view: () => <></>,
    defaultMeta: undefined,
  };

  constructor(config?: TemplateConfig<TProps, TMeta, TRes>) {
    if (config) {
      this._config = config;
    }
  }

  public title(title: string) {
    return createNewBuilder({
      ...this._config,
      title,
    });
  }

  public preview<TNewProps extends TProps>(data: TNewProps) {
    return createNewBuilder<TNewProps, TMeta, TRes>({
      ...this._config,
      previewProps: data,
    } as any);
  }

  public props<TNewProps extends AnyTemplateProps = AnyTemplateProps>(
    propSchema: SchemaOf<TNewProps>
  ) {
    return createNewBuilder<TNewProps, TMeta, TRes>({
      ...this._config,
      schema: { ...this._config.schema, Props: propSchema },
    } as any);
  }

  public meta<TNewMeta extends AnyMeta>(metaSchema: SchemaOf<TNewMeta>) {
    return createNewBuilder<TProps, TNewMeta, TRes>({
      ...this._config,
      schema: { ...this._config.schema, Meta: metaSchema },
    } as any);
  }

  public metaDefault(defaultMeta: (props: TProps) => Partial<TMeta>) {
    return createNewBuilder({
      ...this._config,
      defaultMeta,
    });
  }

  public onSend<TNewRes extends any>(
    onSend: (args: RenderResult<TMeta>) => TNewRes | Promise<TNewRes>,
    schema?: SchemaOf<TNewRes>
  ) {
    return createNewBuilder<TProps, TMeta, TNewRes>({
      ...this._config,
      onSend: onSend,
      schema: {
        ...this._config.schema,
        SendResponse: schema,
      },
    } as any);
  }

  public view(view: (props: TProps) => JSX.Element) {
    return createTemplate({
      view,
      defaultMeta: this._config.defaultMeta,
      metaSchema: this._config.schema.Meta,
      propSchema: this._config.schema.Props,
      onSend: this._config.onSend,
      sendResSchema: this._config.schema.SendResponse,
      title: this._config.title,
      previewProps: this._config.previewProps,
    });
  }
}

export const createTemplateBuilder = () => {
  return new TemplateBuilder();
};
