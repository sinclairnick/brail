import { GetStaticProps } from 'next';
import {
  CreateTemplateOptions,
  EmailTemplate,
  PropType,
  RenderFn,
  TemplatePageStaticProps,
} from './types';
import { render as renderToHtml, MjType } from '@brail/mjml';
import { createHandler } from '../server/server';

const defaultMjmlOptions: MjType.Mjml2HtmlOptions = {
  beautify: true,
  validationLevel: 'soft',
  keepComments: false,
  minify: false,
};

export function createTemplate<P extends PropType>(
  Template: (props: P) => JSX.Element,
  options: CreateTemplateOptions<P>
): EmailTemplate<P> {
  const render: RenderFn<P> = (options) => {
    console.log('[brail] Rendering html...');
    const { props, ...mjmlOptions } = options;

    return renderToHtml(<Template {...props} />, {
      ...defaultMjmlOptions,
      ...mjmlOptions,
    });
  };

  const getStaticProps: GetStaticProps<TemplatePageStaticProps> = () => {
    const res = render({
      props: options.previewData,
      ...options.renderOptions,
    });
    return {
      props: { ...res },
    };
  };

  const handler = createHandler(render);

  return {
    getStaticProps,
    handler,
    name: options.name,
  };
}
