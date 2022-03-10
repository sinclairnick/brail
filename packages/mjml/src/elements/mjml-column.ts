import React, { CSSProperties, ReactNode } from 'react';
import {
  BorderProps,
  ClassNameProps,
  InnerBorderProps,
  PaddingProps,
} from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type ColumnProps = {
  children?: ReactNode;
  width?: string | number | undefined;
  verticalAlign?: CSSProperties['verticalAlign'] | undefined;
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
  innerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps &
  BorderProps &
  InnerBorderProps;

export const Column = createMjmlElement<ColumnProps>('mj-column');
