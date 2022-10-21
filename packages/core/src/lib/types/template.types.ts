import { MjType, RenderResult } from '@brail/mjml';

export type EmailMeta = {
  subject: string;
  preview: string;
};

export type TemplateMethods<T> = {
  path: () => string;
  render: (props: T, options: MjType.Mjml2HtmlOptions) => RenderResult;
  meta: (props: T) => Partial<EmailMeta>;
  propType: {
    new (...args: any[]): any;
  };
};

export type CreateTemplateArgs<T> = {
  path: string;
  template: (props: T) => JSX.Element;
  meta: (props: T) => Partial<EmailMeta>;
  preview: () => T;
};

export type CreateTemplateReturn<T> = (() => JSX.Element) & TemplateMethods<T>;
