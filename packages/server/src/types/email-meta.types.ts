import { z } from 'zod';

export const emailMetaSchema = z.object({
  subject: z.string(),
  preview: z.string().optional(),
});

export type EmailMeta = z.infer<typeof emailMetaSchema>;
