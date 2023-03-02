import { z, ZodTypeAny } from 'zod';
import { createTemplate } from '../create-template.constants';
import { t } from '../trpc.constants';
import { emailMetaSchema } from '../types/email-meta.types';
import { BrailTemplate } from '../types/template.types';
import {
  CreateGetInputSchemaArg,
  CreateGetOutputSchemaArg,
} from './schema.types';

export const createGetInputSchema = <
  P extends ZodTypeAny,
  O extends ZodTypeAny
>(
  template: CreateGetInputSchemaArg<P, O>
) => {
  return z.object({
    data: template.propSchema,
    opts: template.optionsSchema,
  });
};

export const createGetOutputSchema = <P, O>(
  template: CreateGetOutputSchemaArg<P, O>
) => {
  const emailMeta =
    template.meta != null ? emailMetaSchema : emailMetaSchema.partial();

  return z.object({ html: z.string(), meta: emailMeta });
};

export const createGetProcedure = <P extends ZodTypeAny, O extends ZodTypeAny>(
  path: `/${string}`,
  template: BrailTemplate<P, O>
) => {
  return t.procedure
    .meta({
      openapi: {
        method: 'POST',
        path,
        contentTypes: ['application/json'],
      },
    })
    .input(
      z.object({
        data: template.propSchema,
        // opts: template.optionsSchema,
      })
    )
    // .output(createGetOutputSchema(template))
    .query(async ({ ctx, input }) => {
      const html = await template.toHtml(input.data, input.opts);
      const meta = template.meta?.(input.data) ?? {};

      return { html, meta };
    });
};

export const menuUpdate = createTemplate({
  propSchema: z.object({}),
  preview: () => {
    return {};
  },
});
