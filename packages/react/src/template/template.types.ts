import type {
  CreateTemplateReturn,
  AnyCreateTemplateReturn,
} from "@brail/types";

export type InferTemplateProps<T extends AnyCreateTemplateReturn> =
  T extends CreateTemplateReturn<infer TProps> ? TProps : never;

export type InferTemplateMeta<T extends AnyCreateTemplateReturn> =
  T extends CreateTemplateReturn<any, infer TMeta> ? TMeta : never;
