import ReactDOMServer from 'react-dom/server';
import { MjmlError } from './types';
import mjmlToHtml from "mjml-core"

export { renderToJSON } from './utils/render-to-json';
export { renderToJSON2 } from './utils/render-to-json2';

export type RenderResult = {
  html: string;
  errors: MjmlError[];
};

export function render(email: any, options = {}): RenderResult {
  // Stop fs errors on frontend and window missing errors on frontend...
  const mjmlToHtml =
    typeof window === 'undefined' ? require('mjml') : require('mjml-browser');

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
