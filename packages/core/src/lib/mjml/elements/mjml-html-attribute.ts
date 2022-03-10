import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type HtmlAttributeProps = {
  children?: React.ReactNode;
};

export const HtmlAttribute =
  createMjmlElement<HtmlAttributeProps>('mj-html-attribute');
