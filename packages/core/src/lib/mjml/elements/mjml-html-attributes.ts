import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlHtmlAttributesProps = {
  children?: React.ReactNode;
};

export const MjmlHtmlAttributes =
  createMjmlElement<MjmlHtmlAttributesProps>('mj-html-attributes');
