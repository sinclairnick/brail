import React, { ReactNode } from 'react';
import { PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type TableProps = {
  children?: ReactNode;
  color?: CSS.Properties['color'] | undefined;
  cellpadding?: string | undefined;
  cellspacing?: string | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  fontStyle?: string | undefined;
  lineHeight?: string | number | undefined;
  containerBackgroundColor?: CSS.Properties['backgroundColor'] | undefined;
  width?: string | number | undefined;
  tableLayout?: 'auto' | 'fixed' | 'initial' | 'inherit' | undefined;
  align?: 'left' | 'right' | 'center' | undefined;
  role?: 'presentation' | 'none';
  border?: CSS.Properties['border'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const Table = createMjmlElement<TableProps>('mj-table');
