import { MjType, RenderResult } from '@brail/mjml';

export type EmailMeta = {
  subject: string;
  preview: string;
};

export type TemplateMethods<T> = {
  templateName: () => string;
  path: () => string;
  render: (props: T, options: MjType.Mjml2HtmlOptions) => RenderResult;
  meta?: (props: T) => Partial<EmailMeta>;
  propType: {
    new (...args: any[]): any;
  };
  generatePreviewHtml: () => string;
  generatePreviewMjml: () => string;
  generatePreviewJson: () => string;
  getErrors: () => MjType.MjmlError[];
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
  /** Set the default options for rendering email templates */
  options?: Partial<MjType.Mjml2HtmlOptions>;
};

export type CreateTemplateReturn<T> = ((props: {
  html: string;
}) => JSX.Element) &
  TemplateMethods<T>;
