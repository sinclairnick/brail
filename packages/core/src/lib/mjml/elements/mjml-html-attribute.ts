import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlHtmlAttributeProps = {
  children?: React.ReactNode;
};

export const MjmlHtmlAttribute =
  createMjmlElement<MjmlHtmlAttributeProps>('mj-html-attribute');
