import { MjType, RenderResult } from '@brail/mjml';
import { PropType } from './props.type';

export type RenderOptions<P extends PropType> = MjType.Mjml2HtmlOptions & {
  props: P;
};

export type RenderFn<P extends PropType> = (
  options: RenderOptions<P>
) => RenderResult;

export type RenderingError = MjType.MjmlError;
