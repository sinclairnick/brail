import { AnyCreateTemplateReturn } from "@brail/types";
import { BeforeMount, OnMount } from "@monaco-editor/react";
import { zodToJsonSchema } from "zod-to-json-schema";
import z from "zod";

// Arbitrary URI
const jsonUri = "https://brail.dev/schemas/meta.schema.json";

export type AnySendValue = {
  meta: unknown;
  data: unknown;
  $headers?: Record<string, string | string[] | undefined>;
};

export const createBeforeMountHandler =
  (activeTemplate: AnyCreateTemplateReturn | undefined): BeforeMount =>
  (monaco) => {
    const meta = activeTemplate?.schema.Meta ?? z.any();
    const data = activeTemplate?.schema.Props ?? z.any();

    const zodSchema = z.object({
      meta,
      data,
      $headers: z
        .record(z.string(), z.string().or(z.string().array()).or(z.undefined()))
        .optional(),
    });
    const jsonSchema = zodToJsonSchema(zodSchema);

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: false,
      validate: true,
      trailingCommas: "ignore",
      schemas: [
        {
          schema: jsonSchema,
          uri: jsonUri,
          fileMatch: ["*"],
        },
      ],
    });
  };
