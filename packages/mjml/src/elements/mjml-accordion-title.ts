import React, { CSSProperties, ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';
import { ClassNameProps, PaddingProps } from '../types';

export type AccordionTitleProps = {
  children?: ReactNode;
  color?: CSSProperties['color'] | undefined;
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
} & PaddingProps &
  ClassNameProps;

export const AccordionTitle =
  createMjmlElement<AccordionTitleProps>('mj-accordion-title');
