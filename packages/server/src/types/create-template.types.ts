import { FC } from 'react';
import { z, ZodTypeAny } from 'zod';
import { EmailMeta } from './email-meta.types';
import { PropType } from './util.types';

export type CreateTemplateArgs<P extends ZodTypeAny> = {
  propSchema: P;
  template: FC<z.infer<P>>;
  preview: z.infer<P>;
  meta?: (props: z.infer<P>) => EmailMeta;
};
