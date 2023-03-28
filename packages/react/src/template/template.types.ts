import type {
  CreateTemplateReturn,
  AnyMeta,
  RenderResult,
  SchemaOf,
} from "@brail/types";
import { AnyZodObject, z, ZodTypeAny } from "zod";
import { AnyProps, TemplateBuilder } from "..";

export type AnyTemplateBuilder = TemplateBuilder<any, any, any>;
export type InferZodSchema<T extends ZodTypeAny> = z.infer<T>;

export interface ITemplateBuilder<
  TProps extends AnyProps,
  TMeta extends AnyMeta,
  TRes extends any
> {
  title: (title: string) => ITemplateBuilder<TProps, TMeta, TRes>;
  preview: (props: TProps) => ITemplateBuilder<TProps, TMeta, TRes>;
  props: <TSchema extends AnyZodObject>(
    propSchema: TSchema
  ) => ITemplateBuilder<InferZodSchema<TSchema>, TMeta, TRes>;
  meta: <TSchema extends AnyZodObject>(
    metaSchema: TSchema
  ) => ITemplateBuilder<TProps, InferZodSchema<TSchema>, TRes>;
  metaDefault: (
    defaultMeta: (props: TProps) => Partial<TMeta>
  ) => ITemplateBuilder<TProps, TMeta, TRes>;
  onSend: <TNewRes extends any>(
    onSend: (args: RenderResult<TMeta>) => TNewRes | Promise<TNewRes>,
    schema?: SchemaOf<TNewRes>
  ) => ITemplateBuilder<TProps, TMeta, TNewRes>;
  view: (
    view: (props: TProps) => JSX.Element
  ) => CreateTemplateReturn<TProps, TMeta, TRes>;
}
