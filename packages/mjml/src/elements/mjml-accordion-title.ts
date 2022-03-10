import React, { CSSProperties, ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';
import { ClassNameProps, PaddingProps } from '../types';
import CSS from 'csstype';

export type AccordionTitleProps = {
  children?: ReactNode;
  color?: CSS.Properties['color'] | undefined;
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
} & PaddingProps &
  ClassNameProps;

export const AccordionTitle =
  createMjmlElement<AccordionTitleProps>('mj-accordion-title');
