import { CreateTemplateReturn } from '../types/template.types';
import { NextApiHandler } from 'next';
import { createApp, CreateAppOptions } from './app.util';

export type CreateServerOptions = {} & CreateAppOptions;

export function createServer(
  templates: CreateTemplateReturn<any>[],
  options?: CreateServerOptions
): NextApiHandler {
  const app = createApp(templates, options);

  return (req, res) => {
    const result = app(req, res);
    return result;
  };
}
