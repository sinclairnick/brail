import * as ReactDOM from "react-dom/server";
import { headStore } from "../styles";
import { OUTLOOK_DPI_NORMALIZATION } from "../styles/outlook-dpi.style";
import { TemplateWrapper } from "./template-wrapper.component";

export const DYNAMIC_STYLES_KEY = "__dynamic";

export const singleLine = (text: string) => {
  const out = text.replace(/[\r\n\t]+/g, "");
  return out;
};

export const addHeadStyles = (html: string) => {
  const styleStr = headStore.getStyleString();
  const out = html.replace(
    new RegExp(`<style id="${DYNAMIC_STYLES_KEY}">(.*)</style>`, "gm"),
    `<style type="text/css">${singleLine(styleStr)}</style>` 
      // // This isn't required client-side and breaks it, so just add server-only
      // `<style type="text/css">${OUTLOOK_DPI_NORMALIZATION}</style>`
  );
  return out;
};

/** Strip extraneous tags used to encode html comments in react */
export const fixHtmlComments = (html: string) => {
  return html.replace(/<script class="__comment">([\s\S]+?)<\/script>/g, "$1");
};

const postFix = (html: string) => {
  const pipeline = [singleLine, addHeadStyles, fixHtmlComments];
  const out = pipeline.reduce((html, fn) => fn(html), html);
  return out;
};

export const render = (component: JSX.Element) => {
  const _component = <TemplateWrapper>{component}</TemplateWrapper>;

  try {
    return renderNode(_component);
  } catch (e) {
    if (e instanceof TypeError) {
      return renderEdge(_component);
    }
    throw e;
  }
};

export const renderNode = (component: JSX.Element) => {
  const html = ReactDOM.renderToStaticMarkup(component);

  return postFix(html);
};

/** Used for edge runtimes with the `ReadableStream` API */
export const renderEdge = async (component: JSX.Element) => {
  const stream = await ReactDOM.renderToReadableStream(component);
  const response = new Response(stream);
  const blob = await response.blob();
  const html = await blob.text();

  return postFix(html);
};
