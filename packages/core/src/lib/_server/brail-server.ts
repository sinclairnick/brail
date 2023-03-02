import { CreateTemplateReturn } from '../types/template.types';
import { NextApiHandler } from 'next';
import { CreateAppOptions, createBailApp } from './app';

export type CreateServerOptions = {} & CreateAppOptions;

export function createServer(
  templates: CreateTemplateReturn<any>[],
  options?: CreateServerOptions
): NextApiHandler {
  const app = createBailApp(templates, options);

  return app.handle;
}
