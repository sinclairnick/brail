import { CSSProperties, ReactNode } from 'react';
import { PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type TableProps = {
  children?: ReactNode;
  color?: CSSProperties['color'] | undefined;
  cellpadding?: string | undefined;
  cellspacing?: string | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  fontStyle?: string | undefined;
  lineHeight?: string | number | undefined;
  containerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
  width?: string | number | undefined;
  tableLayout?: 'auto' | 'fixed' | 'initial' | 'inherit' | undefined;
  align?: 'left' | 'right' | 'center' | undefined;
  role?: 'presentation' | 'none';
  border?: CSSProperties['border'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const Table = createMjmlElement<TableProps>('mj-table');
