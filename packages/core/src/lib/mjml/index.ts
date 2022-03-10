import ReactDOMServer from 'react-dom/server';

export { renderToJSON } from './utils/render-to-json';
export { renderToJSON2 } from './utils/render-to-json2';

export async function render(email: any, options = {}) {
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
