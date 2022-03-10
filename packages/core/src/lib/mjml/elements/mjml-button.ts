import React from 'react';
import { BorderProps, ClassNameProps, HrefProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlButtonProps = {
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  children?: React.ReactNode;
  containerBackgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  fontStyle?: string | undefined;
  fontSize?: string | number | undefined;
  fontWeight?: number | undefined;
  fontFamily?: string | undefined;
  color?: React.CSSProperties['color'] | undefined;
  textAlign?: React.CSSProperties['textAlign'] | undefined;
  textDecoration?: string | undefined;
  textTransform?: string | undefined;
  align?: string | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
  lineHeight?: string | number | undefined;
  innerPadding?: string | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
} & PaddingProps &
  ClassNameProps &
  HrefProps &
  BorderProps;

export const MjmlButton = createMjmlElement<MjmlButtonProps>('mj-button');
