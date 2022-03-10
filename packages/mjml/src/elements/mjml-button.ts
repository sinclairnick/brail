import React, { ReactNode } from 'react';
import { BorderProps, ClassNameProps, HrefProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type ButtonProps = {
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
  children?: ReactNode;
  containerBackgroundColor?: CSS.Properties['backgroundColor'] | undefined;
  fontStyle?: string | undefined;
  fontSize?: string | number | undefined;
  fontWeight?: number | undefined;
  fontFamily?: string | undefined;
  color?: CSS.Properties['color'] | undefined;
  textAlign?: CSS.Properties['textAlign'] | undefined;
  textDecoration?: string | undefined;
  textTransform?: string | undefined;
  align?: string | undefined;
  verticalAlign?: CSS.Properties['verticalAlign'] | undefined;
  lineHeight?: string | number | undefined;
  innerPadding?: string | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
} & PaddingProps &
  ClassNameProps &
  HrefProps &
  BorderProps;

export const Button = createMjmlElement<ButtonProps>('mj-button');
