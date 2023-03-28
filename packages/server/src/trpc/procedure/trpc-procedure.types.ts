import {
  AnyCreateTemplateReturn,
  AnyMeta,
  AnyTemplateProps,
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

export type CreateTrpcQueryReturn<
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TDefaultMeta extends Partial<AnyMeta> = Partial<AnyMeta>
> = BuildProcedure<
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
>;

export type CreateTrpcMutationArgs<TTemplate extends AnyCreateTemplateReturn> =
  CreateTrpcProcedureArgs<TTemplate>;

export type MutationArgs<TProps, TMeta> = {
  data: TProps;
  meta: TMeta;
};

export type CreateTrpcMutationReturn<
  TProps extends AnyTemplateProps = AnyTemplateProps,
  TMeta extends AnyMeta = AnyMeta,
  TResponse extends any = void
> = BuildProcedure<
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
>;
