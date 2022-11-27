export type EmailMeta = {
  subject: string;
  preview: string;
};

export type TemplateMethods<T, O, R, E> = {
  templateName: () => string;
  path: () => string;
  render: (props: T, options: O) => R;
  /** React + Edge runtime means we must use this in API routes */
  renderAsync: (props: T, options: O) => Promise<R>;
  meta?: (props: T) => Partial<EmailMeta>;
  propType: {
    new (...args: any[]): any;
  };
  generatePreviewHtml: () => Promise<string>;
  generatePreviewMjml: () => Promise<string>;
  generatePreviewJson: () => Promise<string>;
  getErrors: () => Promise<E[]>;
};

export type CreateTemplateArgs<T, O> = {
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
    new (...args: any[]): T;
  };
  /** Set the default options for rendering email templates */
  options?: Partial<O>;
};

export type CreateTemplateReturn<T, O = any, R = any, E = any> = ((props: {
  html: string;
}) => JSX.Element) &
  TemplateMethods<T, O, R, E>;
