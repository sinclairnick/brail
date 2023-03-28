import type { z } from "zod";

export type AnyTemplateMap = {
  [key: string]: AnyCreateTemplateReturn | AnyTemplateMap;
};

export type SchemaOf<T> = z.Schema<T>;

export type AnyTemplateProps = { [key: string]: any };

export type AnyMeta = { [key: string]: any };

export type RenderResult<T extends AnyMeta> = {
  html: string;
  defaultMeta: T;
};

export type OnSendArgs<TMeta extends AnyMeta> = {
  html: string;
  meta: TMeta;
};

export type OnSendFn<TMeta extends AnyMeta, TRes extends any = void> = (
  args: OnSendArgs<TMeta>
) => TRes;

export type AnyOnSendFn = OnSendFn<any>;

export type CreateTemplateArgs<
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TMeta extends AnyMeta = AnyMeta,
  TDefaultMeta extends Partial<AnyMeta> = Partial<AnyMeta>,
  TRes extends any = void
> = {
  // Can't use property 'name' for when Object.assign() is later used
  // because it will overwrite the name property of the function
  title?: string;
  view: (props: TProps) => JSX.Element;
  defaultMeta?: (props: TProps) => TDefaultMeta;
  onSend?: OnSendFn<TMeta, TRes>;
  previewProps?: TProps;

  // SCHEMA
  propSchema?: SchemaOf<TProps>;
  metaSchema?: SchemaOf<TMeta>;
  sendResSchema?: SchemaOf<TRes>;
};

export type TemplatePreview = () => JSX.Element;

export type TemplateConfigSchema<TProps, TMeta, TRes> = {
  Props: SchemaOf<TProps> | undefined;
  Meta: SchemaOf<TMeta> | undefined;
  SendResponse: SchemaOf<TRes> | undefined;
};

export type TemplateViewFn<TProps> = (props: TProps) => JSX.Element;

export type TemplateDefaultMetaFn<TProps, TDefaultMeta> = (
  props: TProps
) => Partial<TDefaultMeta>;

export interface TemplateConfigDef<TProps, TMeta, TRes> {
  _props: TProps;
  _meta: TMeta;
  _res: TRes;
}

export type TemplateConfig<
  TProps extends AnyTemplateProps,
  TMeta extends AnyMeta,
  TDefaultMeta extends Partial<AnyMeta>,
  TRes extends any = void
> = {
  _def: TemplateConfigDef<TProps, TMeta, TRes>;
  schema: TemplateConfigSchema<TProps, TMeta, TRes>;
  title: string | undefined;
  view: TemplateViewFn<TProps>;
  defaultMeta?: TemplateDefaultMetaFn<TProps, TDefaultMeta>;
  onSend?: OnSendFn<TMeta, TRes>;
  previewProps?: TProps;
};

export type AnyTemplateConfig = TemplateConfig<any, any, any>;

export type TemplateRenderFn<TProps> = (props: TProps) => Promise<string>;
export type TemplateSendFn<TProps, TMeta, TRes> = (input: {
  data: TProps;
  meta: TMeta;
}) => Promise<TRes>;
export type TemplatePreviewFn<TProps> = (props?: TProps) => JSX.Element;

export type TemplateProperties<
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TMeta extends AnyMeta = AnyMeta,
  TDefaultMeta extends Partial<AnyMeta> = Partial<AnyMeta>,
  TRes extends any = void
> = TemplateConfig<TProps, TMeta, TDefaultMeta, TRes> & {
  render: TemplateRenderFn<TProps>;
  send: TemplateSendFn<TProps, TMeta, TRes>;
  preview: TemplatePreviewFn<TProps>;

  // Below are set by framework/webpack loader
  __path?: string;
};

export type TemplatePreviewComponent = () => JSX.Element;

export type CreateTemplateReturn<
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TMeta extends AnyMeta = AnyMeta,
  TDefaultMeta extends Partial<AnyMeta> = Partial<AnyMeta>,
  TRes extends any = void
> = TemplatePreviewComponent &
  TemplateProperties<TProps, TMeta, TDefaultMeta, TRes>;

export type AnyCreateTemplateReturn = CreateTemplateReturn<any, any, any, any>;

export type InferTemplateProps<T extends AnyCreateTemplateReturn> =
  T extends CreateTemplateReturn<infer TProps, any, any> ? TProps : never;

export type InferTemplatePropsSchema<T extends AnyCreateTemplateReturn> =
  T extends CreateTemplateReturn<infer TProps, any, any>
    ? SchemaOf<TProps>
    : never;

export type InferTemplateMeta<T extends AnyCreateTemplateReturn> =
  T extends CreateTemplateReturn<any, infer TMeta, any> ? TMeta : never;

export type InferTemplateMetaSchema<T extends AnyCreateTemplateReturn> =
  T extends CreateTemplateReturn<any, infer TMeta, any>
    ? SchemaOf<TMeta>
    : never;

export type InferTemplateResponse<T extends AnyCreateTemplateReturn> =
  T extends CreateTemplateReturn<any, any, infer TRes> ? TRes : never;

export type InferTemplateResponseSchema<T extends AnyCreateTemplateReturn> =
  T extends CreateTemplateReturn<any, any, infer TRes> ? SchemaOf<TRes> : never;
