import { PropType } from './props.type';
import { RenderFn, RenderingError, RenderOptions } from './render.types';

export type TemplateMeta = {
  subject: string;
};

export type GenerateMetaFn<P extends PropType> = (props: P) => TemplateMeta;

export type CreateTemplateOptions<P extends PropType> = {
  pathName: string;
  previewData: P;
  generateMeta: GenerateMetaFn<P>;
  renderOptions?: Omit<RenderOptions<P>, 'props'>;
};

export type TemplatePage<P extends PropType> = {
  pathName: string;
  (): JSX.Element;
  render: RenderFn<P>;
  generateMeta: GenerateMetaFn<P>;
};

export type TemplatePageStaticProps = {
  html: string;
  errors: RenderingError[];
};
