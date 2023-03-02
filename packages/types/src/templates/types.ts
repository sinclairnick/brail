import { FC, PropsWithChildren } from "react";
import type { z } from "zod";

export type AnyTemplateMap = {
  [key: string]: AnyCreateTemplateReturn | AnyTemplateMap;
};

export type SchemaOf<T> = z.Schema<T>;

export type AnyTemplateProps = { [key: string]: any };

export type AnyMeta = { [key: string]: any };

export type RenderResult<T extends AnyMeta> = {
  html: string;
  meta: T;
};

export type OnSendFn<TMeta extends AnyMeta, TRes extends any = void> = (
  args: RenderResult<TMeta>
) => TRes;

export type AnyOnSendFn = OnSendFn<any>;

export type CreateTemplateArgs<
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TMeta extends AnyMeta = AnyMeta,
  TRes extends any = void
> = {
  // Can't use property 'name' for when Object.assign() is later used
  // because it will overwrite the name property of the function
  title?: string;
  view: (props: TProps) => JSX.Element;
  defaultMeta?: (props: TProps) => Partial<TMeta>;
  onSend?: OnSendFn<TMeta, TRes>;
  previewProps?: TProps;

  // SCHEMA
  propSchema?: SchemaOf<TProps>;
  metaSchema?: SchemaOf<TMeta>;
  sendResSchema?: SchemaOf<TRes>;
};

export type TemplatePreview = () => JSX.Element;

export type TemplateConfig<
  TProps extends AnyTemplateProps,
  TMeta extends AnyMeta,
  TRes extends any = void
> = {
  _def: {
    _props: TProps;
    _meta: TMeta;
    _res: TRes;
  };
  schema: {
    Props: SchemaOf<TProps> | undefined;
    Meta: SchemaOf<TMeta> | undefined;
    SendResponse: SchemaOf<TRes> | undefined;
  };
  title: string | undefined;
  view: (props: TProps) => JSX.Element;
  defaultMeta?: (props: TProps) => Partial<TMeta>;
  onSend?: OnSendFn<TMeta, TRes>;
  previewProps?: TProps;
};

export type AnyTemplateConfig = TemplateConfig<any, any, any>;

export type TemplateProperties<
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TMeta extends AnyMeta = AnyMeta,
  TRes extends any = void
> = TemplateConfig<TProps, TMeta, TRes> & {
  render: (props: TProps) => Promise<string>;
  send: (input: { data: TProps; meta: TMeta }) => Promise<TRes>;
  preview: (props?: TProps | undefined) => JSX.Element;

  // Below are set by framework/webpack loader
  __path?: string;
};

export type CreateTemplateReturn<
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TMeta extends AnyMeta = AnyMeta,
  TRes extends any = void
> = (() => JSX.Element) & TemplateProperties<TProps, TMeta, TRes>;

export type AnyCreateTemplateReturn = CreateTemplateReturn<any, any, any>;
