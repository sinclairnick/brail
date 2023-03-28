import {
  AnyCreateTemplateReturn,
  CreateTemplateReturn,
  RenderResult,
} from "@brail/types";
import { BuildProcedure, ProcedureParams } from "@trpc/server";
import { AnyTrpc } from "../trpc.types";

export type CreateTrpcProcedureArgs<TTemplate extends AnyCreateTemplateReturn> =
  {
    t: AnyTrpc;
    template: TTemplate;
    pathName: string;
  };

export type CreateTrpcQueryReturn<TTemplate extends AnyCreateTemplateReturn> =
  TTemplate extends CreateTemplateReturn<
    infer TProps,
    infer TMeta,
    infer TDefaultMeta,
    any
  >
    ? BuildProcedure<
        "query",
        ProcedureParams<
          any,
          unknown,
          TProps,
          TProps,
          RenderResult<TDefaultMeta>,
          RenderResult<TDefaultMeta>
        >,
        RenderResult<TDefaultMeta>
      >
    : never;

export type CreateTrpcMutationArgs<TTemplate extends AnyCreateTemplateReturn> =
  CreateTrpcProcedureArgs<TTemplate>;

export type MutationArgs<TProps, TMeta> = {
  data: TProps;
  meta: TMeta;
};

export type CreateTrpcMutationReturn<
  TTemplate extends AnyCreateTemplateReturn
> = TTemplate extends CreateTemplateReturn<
  infer TProps,
  infer TMeta,
  infer TDefaultMeta,
  infer TResponse
>
  ? BuildProcedure<
      "mutation",
      ProcedureParams<
        any,
        unknown,
        MutationArgs<TProps, TMeta>,
        MutationArgs<TProps, TMeta>,
        TResponse,
        TResponse
      >,
      TResponse
    >
  : never;
