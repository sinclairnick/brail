import {
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
    [key in keyof TMap]: TMap[key] extends CreateTemplateReturn<
      infer TProps,
      infer TMeta,
      infer TRes
    >
      ? CreateTemplateProcedures<TProps, TMeta, TConfig, TRes>
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
  TProps extends AnyTemplateProps,
  TMeta extends AnyMeta,
  TConfig extends AnyRootConfig,
  TResponse extends any = void
> = CreateRouterInner<
  TConfig,
  {
    html: CreateTrpcQueryReturn<TProps, TMeta>;
    send: CreateTrpcMutationReturn<TProps, TMeta, TResponse>;
  }
>;
