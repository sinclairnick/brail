import * as ReactDomServer from 'react-dom/server';
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

export function renderToHtml_sync(
  email: any,
  options: Mjml2HtmlOptions = {}
): RenderResult {
  return mjmlToHtml(renderToMjml_server(email), { ...defaults, ...options });
}

/** Requires using readableStreams, forcing the function to be async */
export async function renderToHtml_async(
  email: any,
  options: Mjml2HtmlOptions = {}
): Promise<RenderResult> {
  const mjml = await renderToMjml_clent(email);
  return mjmlToHtml(mjml, { ...defaults, ...options });
}

export async function renderToMjml_clent(
  email: any,
  options?: {
    prettify?: boolean;
  }
) {
  if (ReactDomServer.renderToReadableStream) {
    const stream = await ReactDomServer.renderToReadableStream(email);
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const res = await reader.read();
      if (res.done) break;
      chunks.push(res.value);
    }
    const str = chunks.map((x) => Buffer.from(x).toString('utf-8')).join('');
    return str;
  }

  return '';
}

export function renderToMjml_server(
  email: any,
  options?: {
    prettify?: boolean;
  }
) {
  const str = ReactDomServer.renderToStaticMarkup(email);

  // if (options?.prettify) {
  //   return pretty(str, { ocd: true });
  // }

  return str;
}

export * as Mj from './elements';
export * as MjType from './types';
