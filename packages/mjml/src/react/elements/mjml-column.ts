import React, { ReactNode } from 'react';
import {
  BorderProps,
  ClassNameProps,
  InnerBorderProps,
  PaddingProps,
} from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type ColumnProps = {
  children?: ReactNode;
  width?: string | number | undefined;
  verticalAlign?: CSS.Properties['verticalAlign'] | undefined;
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
  innerBackgroundColor?: CSS.Properties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps &
  BorderProps &
  InnerBorderProps;

export const Column = createMjmlElement<ColumnProps>('mj-column');
