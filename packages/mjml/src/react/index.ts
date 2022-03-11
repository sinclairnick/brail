import * as ReactDOMServer from 'react-dom/server';
import { MjmlError } from './types';
import { mjmlToHtml } from '../core/mjml';

export { renderToJSON } from './utils/render-to-json';
export { renderToJSON2 } from './utils/render-to-json2';

export type RenderResult = {
  html: string;
  errors: MjmlError[];
};

export function render(email: any, options = {}): RenderResult {
  const defaults = {
    keepComments: false,
    beautify: false,
    minify: true,
    validationLevel: 'strict',
  };

  return mjmlToHtml(renderToMjml(email), { ...defaults, ...options });
}

export function renderToMjml(email: any) {
  return ReactDOMServer.renderToStaticMarkup(email);
}

export * as Mj from './elements';
export * as MjType from './types';
