import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type AccordionTextProps = {
  children?: React.ReactNode;
  color?: React.CSSProperties['color'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const AccordionText =
  createMjmlElement<AccordionTextProps>('mj-accordion-text');
