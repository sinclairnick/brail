import { CreateTemplateReturn } from '../types/template.types';
import { NextApiHandler } from 'next';
import { createApp } from './app.util';

export function createServer(
  templates: CreateTemplateReturn<any>[]
): NextApiHandler {
  console.log('Creating server...');
  const app = createApp(templates);

  return (req, res) => {
    console.log(req.url);
    const result = app(req, res);
    console.log(result);
    return result;
  };

  // return async (req, res) => {
  //   console.log('Handling request...');
  //   const url = req.url;
  //   if (url == null) {
  //     res.status(500).json({ message: 'Url not found' });
  //     return;
  //   }

  //   let path = url.replace(/^\/api/, '');
  //   path = stripeTrailingSlashes(path);

  //   console.log(path);
  //   if (path == 'swagger.json') {
  //     res.json(JSON.stringify(spec));
  //     return;
  //   }

  //   const template = templateMap.get(path);

  //   if (template == null) {
  //     res.status(404).json({ message: 'Template not found' });
  //     return;
  //   }

  //   const body = template.propType
  //     ? plainToInstance(template.propType, req.body)
  //     : req.body;

  //   const meta = template.meta(body);
  //   // TODO: Add ability to conditionally return JSON (+ correct RenderResult types to include JSON field)
  //   const { html } = template.render(body, {
  //     beautify: false,
  //     minify: true,
  //     keepComments: false,
  //   });

  //   res.send({ html, meta });
  // };
}
