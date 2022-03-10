import type { Mjml2HtmlOptions, MjmlError } from 'mjml-react';

export type RenderingError = MjmlError;

export type TemplatePageStaticProps = {
  html: string;
  errors: RenderingError[];
};

export type PropType = { [key: string]: any };

export type RenderOptions<P extends PropType> = Mjml2HtmlOptions & {
  props: P;
};
