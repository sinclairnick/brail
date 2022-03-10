import React, { CSSProperties, ReactNode } from 'react';
import { BorderProps, ClassNameProps, HrefProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type ButtonProps = {
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
  children?: ReactNode;
  containerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
  fontStyle?: string | undefined;
  fontSize?: string | number | undefined;
  fontWeight?: number | undefined;
  fontFamily?: string | undefined;
  color?: CSSProperties['color'] | undefined;
  textAlign?: CSSProperties['textAlign'] | undefined;
  textDecoration?: string | undefined;
  textTransform?: string | undefined;
  align?: string | undefined;
  verticalAlign?: CSSProperties['verticalAlign'] | undefined;
  lineHeight?: string | number | undefined;
  innerPadding?: string | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
} & PaddingProps &
  ClassNameProps &
  HrefProps &
  BorderProps;

export const Button = createMjmlElement<ButtonProps>('mj-button');
