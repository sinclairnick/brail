import { createTemplate } from "./template";
import {
  AnyTemplateProps,
  AnyMeta,
  TemplateConfig,
  SchemaOf,
  RenderResult,
  CreateTemplateReturn,
} from "@brail/types";
import z from "zod";
import { InferZodSchema, ITemplateBuilder } from ".";

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
> implements ITemplateBuilder<TProps, TMeta, TRes>
{
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

  public title: (title: string) => ITemplateBuilder<TProps, TMeta, TRes> = (
    title
  ) => {
    return createNewBuilder({ ...this._config, title });
  };

  public preview: <TNewProps extends TProps>(
    props: TNewProps
  ) => ITemplateBuilder<TNewProps, TMeta, TRes> = (props) => {
    return createNewBuilder({
      ...this._config,
      previewProps: props,
    } as any);
  };

  public props: <TSchema extends z.AnyZodObject>(
    propSchema: TSchema
  ) => ITemplateBuilder<InferZodSchema<TSchema>, TMeta, TRes> = (
    propSchema
  ) => {
    return createNewBuilder({
      ...this._config,
      schema: { ...this._config.schema, Props: propSchema },
    } as any);
  };

  public meta: <TSchema extends z.AnyZodObject>(
    metaSchema: TSchema
  ) => ITemplateBuilder<TProps, InferZodSchema<TSchema>, TRes> = (
    metaSchema
  ) => {
    return createNewBuilder({
      ...this._config,
      schema: { ...this._config.schema, Meta: metaSchema },
    } as any);
  };

  public metaDefault: (
    defaultMeta: (props: TProps) => Partial<TMeta>
  ) => ITemplateBuilder<TProps, TMeta, TRes> = (defaultMeta) => {
    return createNewBuilder({
      ...this._config,
      defaultMeta,
    });
  };

  public onSend: <TNewRes extends unknown>(
    onSend: (args: RenderResult<TMeta>) => TNewRes | Promise<TNewRes>,
    schema?: SchemaOf<TNewRes> | undefined
  ) => ITemplateBuilder<TProps, TMeta, TNewRes> = (onSend, schema) => {
    return createNewBuilder({
      ...this._config,
      onSend: onSend,
      schema: {
        ...this._config.schema,
        SendResponse: schema,
      },
    } as any);
  };

  public view: (
    view: (props: TProps) => JSX.Element
  ) => CreateTemplateReturn<TProps, TMeta, TRes> = (view) => {
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
  };
}

export const createTemplateBuilder = () => {
  return new TemplateBuilder();
};
