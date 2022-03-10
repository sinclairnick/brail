import { ReactNode } from 'react';
import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type AccordionTextProps = {
  children?: ReactNode;
  color?: CSS.Properties['color'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const AccordionText =
  createMjmlElement<AccordionTextProps>('mj-accordion-text');
