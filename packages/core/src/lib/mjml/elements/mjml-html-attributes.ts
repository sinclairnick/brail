import { createMjmlElement } from '../utils/create-mjml-element';

export type HtmlAttributesProps = {
  children?: React.ReactNode;
};

export const HtmlAttributes =
  createMjmlElement<HtmlAttributesProps>('mj-html-attributes');
