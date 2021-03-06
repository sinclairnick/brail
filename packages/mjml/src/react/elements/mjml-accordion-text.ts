import { ReactNode } from 'react';
import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import { CSSProperties } from 'react';

export type AccordionTextProps = {
  children?: ReactNode;
  color?: CSSProperties['color'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const AccordionText =
  createMjmlElement<AccordionTextProps>('mj-accordion-text');
