import * as ReactDOMServer from 'react-dom/server';
import { MjmlError } from './types';
import { mjmlToHtml } from '../core/mjml';

export { renderToJSON } from './utils/render-to-json';
export { renderToJSON2 } from './utils/render-to-json2';

import { Mjml2HtmlOptions } from './types';
import pretty from 'pretty';

export type RenderResult = {
  html: string;
  errors: MjmlError[];
  /** TODO: Assign the correct json object type */
  json: any;
};

const defaults: Mjml2HtmlOptions = {
  keepComments: false,
  beautify: false,
  minify: true,
  validationLevel: 'strict',
};

export function renderToHtml(
  email: any,
  options: Mjml2HtmlOptions = {}
): RenderResult {
  return mjmlToHtml(renderToMjml(email), { ...defaults, ...options });
}

export function renderToMjml(
  email: any,
  options?: {
    prettify?: boolean;
  }
) {
  const str = ReactDOMServer.renderToStaticMarkup(email);
  if (options?.prettify) {
    return pretty(str, { ocd: true });
  }

  return str;
}

export * as Mj from './elements';
export * as MjType from './types';
