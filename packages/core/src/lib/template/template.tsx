import { GetStaticProps } from 'next';
import { PropType, RenderOptions, TemplatePageStaticProps } from './types';
import { render as renderToHtml } from '../mjml';
import { Mjml2HtmlOptions, MjmlError } from '../mjml/types';

const defaultMjmlOptions: Mjml2HtmlOptions = {
  beautify: true,
  validationLevel: 'soft',
  keepComments: false,
  minify: false,
};
export type CreateTemplateOptions<P extends PropType> = {
  previewData: P;
  renderOptions?: Omit<RenderOptions<P>, 'props'>;
};

export type RenderFn<P extends PropType> = (
  options: RenderOptions<P>
) => Promise<{ html: string; errors: MjmlError[] }>;

export type EmailTemplate<P extends PropType> = {
  getStaticProps: GetStaticProps<TemplatePageStaticProps>;
  render: RenderFn<P>;
};

export function createTemplate<P extends PropType>(
  Template: (props: P) => JSX.Element,
  options: CreateTemplateOptions<P>
) {
  const render: RenderFn<P> = async (options) => {
    const { props, ...mjmlOptions } = options;

    return renderToHtml(<Template {...props} />, {
      ...defaultMjmlOptions,
      ...mjmlOptions,
    });
  };

  const getStaticProps: GetStaticProps<TemplatePageStaticProps> = async () => {
    const res = await render({
      props: options.previewData,
      ...options.renderOptions,
    });
    return {
      props: { ...res },
    };
  };

  return {
    getStaticProps,
    render,
  };
}
