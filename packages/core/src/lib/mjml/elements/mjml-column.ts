import React from 'react';
import {
  BorderProps,
  ClassNameProps,
  InnerBorderProps,
  PaddingProps,
} from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type ColumnProps = {
  children?: React.ReactNode;
  width?: string | number | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  innerBackgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps &
  BorderProps &
  InnerBorderProps;

export const Column = createMjmlElement<ColumnProps>('mj-body');
