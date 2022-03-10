import React, { CSSProperties, ReactNode } from 'react';
import { PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type TextProps = {
  children?: ReactNode;
  color?: CSSProperties['color'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  fontStyle?: string | undefined;
  fontWeight?: number | undefined;
  lineHeight?: string | undefined;
  letterSpacing?: string | undefined;
  height?: string | number | undefined;
  textDecoration?: string | undefined;
  textTransform?: string | undefined;
  align?: string | undefined;
  containerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const Text = createMjmlElement<TextProps>('mj-text');
