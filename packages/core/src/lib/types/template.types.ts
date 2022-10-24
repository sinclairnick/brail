import { MjType, RenderResult } from '@brail/mjml';
import { GetStaticPropsResult } from 'next';

export type EmailMeta = {
  subject: string;
  preview: string;
};

export type TemplateMethods<T> = {
  templateName: () => string;
  path: () => string;
  render: (props: T, options: MjType.Mjml2HtmlOptions) => RenderResult;
  generatePreviewHtml: () => string;
  generatePreviewMjml: () => string;
  generatePreviewJson: () => string;
  meta: (props: T) => Partial<EmailMeta>;
  propType: {
    new (...args: any[]): any;
  };
};

export type CreateTemplateArgs<T> = {
  /** Should match the current filename */
  path: string;
  /** Optionally specify a name for this template */
  name?: string;
  /** The component to render for an email */
  template: (props: T) => JSX.Element;
  /** Non-visual properties to be generated alongside the email template view */
  meta: (props: T) => Partial<EmailMeta>;
  /** The data to provide to the preview email */
  preview: () => T;
  /**
   *  An optional class used to provide type-safety via OpenAPI schema generation
   * @important All class fields intended to be exposed by the API must annotated with class-validator fields
   * See: https://github.com/typestack/class-validator
   */
  propType?: {
    new (...args: any[]): any;
  };
};

export type CreateTemplateReturn<T> = ((props: {
  html: string;
}) => JSX.Element) &
  TemplateMethods<T>;
