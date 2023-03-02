import { initTRPC, Procedure } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';

export const t = initTRPC.meta<OpenApiMeta>().context().create();
