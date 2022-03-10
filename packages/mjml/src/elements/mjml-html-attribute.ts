import React, { ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type HtmlAttributeProps = {
  children?: ReactNode;
};

export const HtmlAttribute =
  createMjmlElement<HtmlAttributeProps>('mj-html-attribute');
