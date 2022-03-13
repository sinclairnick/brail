import * as React from 'react';
import {
  CreateTemplateOptions,
  PropType,
  RenderFn,
  TemplatePage,
} from '../../shared/types';
import { render as renderToHtml, MjType } from '@brail/mjml';

const defaultMjmlOptions: MjType.Mjml2HtmlOptions = {
  beautify: true,
  validationLevel: 'soft',
  keepComments: false,
  minify: false,
};

export function createTemplate<P extends PropType>(
  Template: (props: P) => JSX.Element,
  options: CreateTemplateOptions<P>
): TemplatePage<P> {
  const render: RenderFn<P> = (options) => {
    const { props, ...mjmlOptions } = options;

    return renderToHtml(<Template {...props} />, {
      ...defaultMjmlOptions,
      ...mjmlOptions,
    });
  };

  const TemplatePage: TemplatePage<P> = Object.assign(
    () => {
      const { previewData, ...mjmlOptions } = options;

      const { html } = renderToHtml(<Template {...previewData} />, {
        ...defaultMjmlOptions,
        ...mjmlOptions,
      });
      // TODO: Add more Layout
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    },
    { render, pathName: options.pathName }
  );

  return TemplatePage;
}
