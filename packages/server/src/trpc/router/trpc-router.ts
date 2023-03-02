import { CreateTemplateReturn, AnyTemplateMap } from "@brail/types";
import { ProcedureRouterRecord } from "@trpc/server";
import {
  createTrpcMutation,
  createTrpcQuery,
} from "../procedure/trpc-procedure";
import {
  CreateTrpcRouterArgs,
  CreateTrpcRouterReturn,
  InferTrpcConfig,
} from "./trpc-router.types";

const isTemplate = <T extends CreateTemplateReturn>(
  value: unknown
): value is T => {
  return (
    typeof value === "function" &&
    value !== null &&
    value.hasOwnProperty("view")
  );
};

const isTemplateMap = <TMap extends AnyTemplateMap>(
  value: unknown
): value is TMap => {
  return typeof value === "object" && value !== null && !isTemplate(value);
};

export const createTrpcRouter = <TArgs extends CreateTrpcRouterArgs>(
  args: TArgs
): CreateTrpcRouterReturn<TArgs["templates"], InferTrpcConfig<TArgs["t"]>> => {
  const { t, templates } = args;
  type $TMap = TArgs["templates"];
  type $TConfig = InferTrpcConfig<TArgs["t"]>;

  const map = {} as CreateTrpcRouterReturn<$TMap, $TConfig>;

  const recursiveMap = (
    inMap: AnyTemplateMap,
    path: string,
    outMap: ProcedureRouterRecord
  ) => {
    for (const [key, value] of Object.entries(inMap)) {
      const newPath = `${path}/${key}`;

      if (isTemplate(value)) {
        outMap[key] = args.t.router({
          html: createTrpcQuery({
            pathName: newPath,
            template: value,
            t: args.t,
          }),
          send: createTrpcMutation({
            pathName: newPath,
            template: value,
            t: args.t,
          }),
        });
      }

      if (isTemplateMap(value)) {
        outMap[key] = args.t.router(recursiveMap(value, newPath, outMap));
      }
    }
    return outMap;
  };

  const baseRouter = t.router(recursiveMap(templates, "", map as any));
  return baseRouter as any;
};
