import { ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type HtmlAttributesProps = {
  children?: ReactNode;
};

export const HtmlAttributes =
  createMjmlElement<HtmlAttributesProps>('mj-html-attributes');
