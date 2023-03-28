import {
  AnyCreateTemplateReturn,
  AnyMeta,
  AnyTemplateMap,
  AnyTemplateProps,
  CreateTemplateReturn,
} from "@brail/types";
import { AnyTrpc } from "../trpc.types";
import type {
  AnyRootConfig,
  CreateRouterInner,
  RootConfig,
} from "@trpc/server";
import { CreateTrpcMutationReturn, CreateTrpcQueryReturn } from "../procedure";

export type CreateTrpcRouterArgs = {
  t: AnyTrpc;
  templates: AnyTemplateMap;
};

export type InferTrpcConfig<T> = T extends { _config: RootConfig<infer TTypes> }
  ? RootConfig<TTypes>
  : never;

export type CreateTrpcRouterReturn<
  TMap extends AnyTemplateMap,
  TConfig extends AnyRootConfig
> = InferTemplateMap<TMap, TConfig>;

export type InferTemplateMap<
  TMap extends AnyTemplateMap,
  TConfig extends AnyRootConfig
> = CreateRouterInner<
  TConfig,
  {
    [key in keyof TMap]: TMap[key] extends AnyCreateTemplateReturn
      ? CreateTemplateProcedures<TMap[key], TConfig>
      : TMap[key] extends AnyTemplateMap
      ? InferTemplateMap<TMap[key], TConfig>
      : never;
  }
>;

// export type InferMapOrTemplate<
//   T extends AnyTemplateMap | CreateTemplateReturn,
//   TConfig extends AnyRootConfig
// > =

export type CreateTemplateProcedures<
  TTemplate extends AnyCreateTemplateReturn,
  TConfig extends AnyRootConfig
> = CreateRouterInner<
  TConfig,
  {
    html: CreateTrpcQueryReturn<TTemplate>;
    send: CreateTrpcMutationReturn<TTemplate>;
  }
>;
