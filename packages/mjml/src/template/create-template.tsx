import * as React from 'react';
import type {
  CreateTemplateArgs,
  CreateTemplateReturn,
  TemplateMethods,
} from '@brail/core/types';
import {
  MjType,
  RenderResult,
  renderToHtml_async,
  renderToHtml_sync,
  renderToJSON2,
  renderToMjml_clent,
} from '../react';
import 'reflect-metadata';

const DEFAULT_MJML_OPTIONS: MjType.Mjml2HtmlOptions = {
  beautify: true,
  validationLevel: 'soft',
  keepComments: false,
  minify: false,
};

export function createTemplate<P extends { [key: string]: any } = any>(
  args: CreateTemplateArgs<P, MjType.Mjml2HtmlOptions>
): CreateTemplateReturn<P> {
  const defaultOptions = Object.assign(DEFAULT_MJML_OPTIONS, args.options);

  const TemplatePage = () => {
    const previewProps = args.preview();

    const { html } = renderToHtml_sync(
      <args.template {...previewProps} />,
      defaultOptions
    );

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const methods: TemplateMethods<
    P,
    MjType.Mjml2HtmlOptions,
    RenderResult,
    MjType.MjmlError
  > = {
    templateName: () =>
      args.name ??
      args.propType?.name.replace('Props', '') ??
      'UnknownTemplate',
    render: (props, options) =>
      renderToHtml_sync(<args.template {...props} />, {
        ...defaultOptions,
        ...options,
      }),
    renderAsync: (props, options) =>
      renderToHtml_async(<args.template {...props} />, {
        ...defaultOptions,
        ...options,
      }),
    meta: args.meta,
    path: () => args.path,
    propType: args.propType ?? class UnknownType {},

    // --- These methods are used for dev previewing largely ---
    generatePreviewHtml: async () => {
      const { html } = await renderToHtml_async(
        <args.template {...args.preview()} />,
        {
          beautify: true,
          keepComments: true,
          minify: false,
          validationLevel: 'skip',
        }
      );
      return html;
    },
    getErrors: async () => {
      const { errors } = await renderToHtml_async(
        <args.template {...args.preview()} />,
        {
          beautify: false,
          keepComments: true,
          minify: false,
          validationLevel: 'soft',
        }
      );
      return errors;
    },
    generatePreviewMjml: () => {
      return renderToMjml_clent(<args.template {...args.preview()} />, {
        prettify: true,
      });
    },
    generatePreviewJson: () => {
      return renderToJSON2(<args.template {...args.preview()} />);
    },
  };

  return Object.assign(TemplatePage, methods);
}
