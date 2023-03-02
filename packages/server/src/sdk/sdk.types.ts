import { CreateTemplateReturn } from "@brail/types";
import type { AnyTemplateMap } from "@brail/types";

export type CreateSdkReturn<TMap extends AnyTemplateMap> =
  InferTemplateMapSdk<TMap>;

export type InferTemplateMapSdk<T> = {
  [key in keyof T]: T[key] extends CreateTemplateReturn<
    infer TProps,
    infer TMeta,
    infer TRes
  >
    ? Pick<
        CreateTemplateReturn<TProps, TMeta, TRes>,
        "render" | "schema" | "send" | "title" | "view"
      >
    : T[key] extends AnyTemplateMap
    ? InferTemplateMapSdk<T[key]>
    : never;
};
