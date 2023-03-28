import type {
  CreateTemplateReturn,
  AnyMeta,
  RenderResult,
  SchemaOf,
} from "@brail/types";
import { AnyZodObject, z, ZodTypeAny } from "zod";
import { AnyProps, TemplateBuilder } from "..";

export type AnyTemplateBuilder = TemplateBuilder<any, any, any, any>;
export type InferZodSchema<T extends ZodTypeAny> = z.infer<T>;

export interface ITemplateBuilder<
  TProps extends AnyProps,
  TMeta extends AnyMeta,
  TDefaultMeta extends Partial<AnyMeta>,
  TRes extends any
> {
  title: (title: string) => ITemplateBuilder<TProps, TMeta, TDefaultMeta, TRes>;
  preview: (
    props: TProps
  ) => ITemplateBuilder<TProps, TMeta, TDefaultMeta, TRes>;
  props: <TSchema extends AnyZodObject>(
    propSchema: TSchema
  ) => ITemplateBuilder<InferZodSchema<TSchema>, TMeta, TDefaultMeta, TRes>;
  meta: <TSchema extends AnyZodObject>(
    metaSchema: TSchema
  ) => ITemplateBuilder<TProps, InferZodSchema<TSchema>, TDefaultMeta, TRes>;
  metaDefault: <TNewDefaultMeta extends TDefaultMeta>(
    defaultMeta: (props: TProps) => TNewDefaultMeta
  ) => ITemplateBuilder<TProps, TMeta, TNewDefaultMeta, TRes>;
  onSend: <TNewRes extends any>(
    onSend: (args: RenderResult<TMeta>) => TNewRes | Promise<TNewRes>,
    schema?: SchemaOf<TNewRes>
  ) => ITemplateBuilder<TProps, TMeta, TDefaultMeta, TNewRes>;
  view: (
    view: (props: TProps) => JSX.Element
  ) => CreateTemplateReturn<TProps, TMeta, TDefaultMeta, TRes>;
}
