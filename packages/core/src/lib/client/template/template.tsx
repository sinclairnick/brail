import * as React from 'react';
import { renderToHtml, MjType, renderToMjml, renderToJSON2 } from '@brail/mjml';
import {
  CreateTemplateArgs,
  CreateTemplateReturn,
  TemplateMethods,
} from '../../types/template.types';
import 'reflect-metadata';
import HtmlReactParser from 'html-react-parser';

const DEFAULT_MJML_OPTIONS: MjType.Mjml2HtmlOptions = {
  beautify: true,
  validationLevel: 'soft',
  keepComments: false,
  minify: false,
};

export function createTemplate<P extends { [key: string]: any } = any>(
  args: CreateTemplateArgs<P>
): CreateTemplateReturn<P> {
  const defaultOptions = Object.assign(DEFAULT_MJML_OPTIONS, args.options);

  const TemplatePage = () => {
    const previewProps = args.preview();

    const { html } = renderToHtml(
      <args.template {...previewProps} />,
      defaultOptions
    );

    return HtmlReactParser(html) as JSX.Element;
  };

  const methods: TemplateMethods<P> = {
    templateName: () =>
      args.name ??
      args.propType?.name.replace('Props', '') ??
      'UnknownTemplate',
    render: (props, options) =>
      renderToHtml(<args.template {...props} />, {
        ...defaultOptions,
        ...options,
      }),
    meta: args.meta,
    path: () => args.path,
    propType: args.propType ?? class {},

    // --- These methods are used for dev previewing largely ---
    generatePreviewHtml: () => {
      const { html } = renderToHtml(<args.template {...args.preview()} />, {
        beautify: true,
        keepComments: true,
        minify: false,
        validationLevel: 'skip',
      });
      return html;
    },
    getErrors: () => {
      const { errors } = renderToHtml(<args.template {...args.preview()} />, {
        beautify: false,
        keepComments: true,
        minify: false,
        validationLevel: 'soft',
      });
      return errors;
    },
    generatePreviewMjml: () => {
      return renderToMjml(<args.template {...args.preview()} />, {
        prettify: true,
      });
    },
    generatePreviewJson: () => {
      return renderToJSON2(<args.template {...args.preview()} />);
    },
  };

  return Object.assign(TemplatePage, methods);
}
