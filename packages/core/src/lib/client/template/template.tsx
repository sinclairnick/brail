import * as React from 'react';
import { render as renderToHtml, MjType } from '@brail/mjml';
import {
  CreateTemplateArgs,
  CreateTemplateReturn,
  TemplateMethods,
} from '../../types/template.types';
import 'reflect-metadata';

const DEFAULT_MJML_OPTIONS: MjType.Mjml2HtmlOptions = {
  beautify: true,
  validationLevel: 'soft',
  keepComments: false,
  minify: false,
};

export function createTemplate<P extends { [key: string]: any } = any>(
  args: CreateTemplateArgs<P>,
  propType?: { new (...args: any[]): P }
): CreateTemplateReturn<P> {
  const TemplatePage = () => {
    const previewProps = args.preview();

    const { html } = renderToHtml(
      <args.template {...previewProps} />,
      DEFAULT_MJML_OPTIONS
    );

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const methods: TemplateMethods<P> = {
    render: (props, options) =>
      renderToHtml(<args.template {...props} />, {
        ...DEFAULT_MJML_OPTIONS,
        ...options,
      }),
    meta: args.meta,
    path: () => args.path,
    propType: propType ?? class {},
  };

  return Object.assign(TemplatePage, methods);
}
