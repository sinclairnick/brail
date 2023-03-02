import type {
  ProcedureBuilder,
  CreateRouterInner,
  AnyRootConfig,
} from "@trpc/server";

export type AnyRouterBuilder = CreateRouterInner<any, any>;
export type AnyProcedureBuilder = ProcedureBuilder<any>;

export type AnyTrpc = {
  _config: AnyRootConfig;
  procedure: AnyProcedureBuilder;
  router: AnyRouterBuilder;
};
