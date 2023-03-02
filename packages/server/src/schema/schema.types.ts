import { AnyZodObject } from 'zod';
import { BrailTemplate } from '../types/template.types';
import { PropType } from '../types/util.types';
import { createGetProcedure } from './schema.constants';

export type CreateGetInputSchemaArg<P extends AnyZodObject, O = unknown> = Pick<
  BrailTemplate<P, O>,
  'propSchema' | 'optionsSchema'
>;

export type CreateGetInputSchemaReturn<P extends PropType, O> = Zod.ZodObject<{
  data: Zod.ZodSchema<P>;
  opts: Zod.Schema<O>;
}>;

export type CreateGetOutputSchemaArg<P extends PropType, O = unknown> = Pick<
  BrailTemplate<P, O>,
  'meta'
>;

export type CreateGetProcedureReturn = ReturnType<typeof createGetProcedure>;
