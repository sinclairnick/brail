import { CSSProperties, ReactNode } from 'react';
import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type DividerProps = {
  borderColor?: CSSProperties['borderColor'] | undefined;
  borderStyle?: CSSProperties['borderStyle'] | undefined;
  borderWidth?: string | number | undefined;
  children?: ReactNode;
  width?: string | number | undefined;
  containerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps &
  PaddingProps;

export const Divider = createMjmlElement<DividerProps>('mj-divider');
