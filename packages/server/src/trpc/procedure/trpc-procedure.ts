import { AnyCreateTemplateReturn } from "@brail/types";
import type { OpenApiMeta } from "trpc-openapi";
import {
  CreateTrpcMutationArgs,
  CreateTrpcMutationReturn,
  CreateTrpcProcedureArgs,
  CreateTrpcQueryReturn,
} from "./trpc-procedure.types";
import z from "zod";

/**
 * Generates and returns html for a given template
 */
export const createTrpcQuery = <TTemplate extends AnyCreateTemplateReturn>(
  args: CreateTrpcProcedureArgs<TTemplate>
): CreateTrpcQueryReturn<
  TTemplate["_def"]["_props"],
  TTemplate["_def"]["_meta"]
> => {
  const { t, template, pathName } = args;

  let proc = t.procedure.meta(<OpenApiMeta>{
    openapi: {
      method: "GET",
      path: pathName,
      contentTypes: ["application/json"],
      description: `Returns html for the '${template.title}' template`,
      enabled: true,
    },
  });

  proc = proc.input(template.schema.Props ?? z.any()).output(
    z.object({
      html: z.string(),
      meta: (template.schema.Meta as z.AnyZodObject)?.partial() ?? z.any(),
    })
  );

  return proc.query(async ({ ctx, input }) => {
    const html = await template.render(input);
    const meta = template.defaultMeta?.(input);

    return { html, meta };
  });
};

/**
 * Sends an email for a given template
 */
export const createTrpcMutation = <TTemplate extends AnyCreateTemplateReturn>(
  args: CreateTrpcMutationArgs<TTemplate>
): CreateTrpcMutationReturn<
  TTemplate["_def"]["_props"],
  TTemplate["_def"]["_meta"],
  TTemplate["_def"]["_res"]
> => {
  const { t, template, pathName } = args;

  let proc = t.procedure.meta(<OpenApiMeta>{
    openapi: {
      method: "PUT",
      path: pathName,
      contentTypes: ["application/json"],
      description: `Sends an email using the '${template.title}' template`,
      enabled: true,
    },
  });

  proc = proc
    .input(
      z.object({
        data: template.schema.Props ?? z.any(),
        meta: template.schema.Meta ?? z.any(),
      })
    )
    .output(template.schema.SendResponse ?? z.any());

  return proc.mutation(async ({ ctx, input }) => {
    return template.send(input);
  });
};
