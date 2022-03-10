import React from 'react';
import { PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type TableProps = {
  children?: React.ReactNode;
  color?: React.CSSProperties['color'] | undefined;
  cellpadding?: string | undefined;
  cellspacing?: string | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  fontStyle?: string | undefined;
  lineHeight?: string | number | undefined;
  containerBackgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  width?: string | number | undefined;
  tableLayout?: 'auto' | 'fixed' | 'initial' | 'inherit' | undefined;
  align?: 'left' | 'right' | 'center' | undefined;
  role?: 'presentation' | 'none';
  border?: React.CSSProperties['border'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const Table = createMjmlElement<TableProps>('mj-body');
