import React, { Component } from 'react';
import { PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlTextProps = {
  children?: React.ReactNode;
  color?: React.CSSProperties['color'] | undefined;
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
  containerBackgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const MjmlText = createMjmlElement<MjmlTextProps>('mj-text');
