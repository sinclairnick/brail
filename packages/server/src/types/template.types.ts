import { AnyZodObject, z } from 'zod';
import { EmailMeta } from './email-meta.types';
import { PropType } from './util.types';

export type TemplateProperties<P extends AnyZodObject, O> = {
  propSchema: P;
  // optionsSchema: z.ZodObject<any, any, any, O>;
  preview: z.infer<P>;
  meta?: (props: z.infer<P>) => Partial<EmailMeta>;
  toHtml: (props: P, options: O) => Promise<string>;
};

export type BrailTemplate<P extends AnyZodObject, O> = ((
  props: P
) => JSX.Element) &
  TemplateProperties<P, O>;

export type TemplateMap = {
  [templateName: string]: BrailTemplate<any, any> | TemplateMap;
};
