import { MjType, RenderResult } from '@brail/mjml';

export type RenderingError = MjType.MjmlError;

export type TemplatePageStaticProps = {
  html: string;
  errors: RenderingError[];
};

export type PropType = { [key: string]: any };

export type RenderOptions<P extends PropType> = MjType.Mjml2HtmlOptions & {
  props: P;
};

export type CreateTemplateOptions<P extends PropType> = {
  pathName: string;
  previewData: P;
  renderOptions?: Omit<RenderOptions<P>, 'props'>;
};

export type RenderFn<P extends PropType> = (
  options: RenderOptions<P>
) => RenderResult;

export type TemplatePage<P extends PropType> = {
  pathName: string;
  (): JSX.Element;
  render: RenderFn<P>;
};
