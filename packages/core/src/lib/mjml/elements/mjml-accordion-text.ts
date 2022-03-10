import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlAccordionTextProps = {
  children?: React.ReactNode;
  color?: React.CSSProperties['color'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const MjmlAccordionText =
  createMjmlElement<MjmlAccordionTextProps>('mj-accordion-text');
