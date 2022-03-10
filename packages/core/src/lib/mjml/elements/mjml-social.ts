import React, { Component } from 'react';

import { PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlSocialProps = {
  borderRadius?: string | number | undefined;
  children?: React.ReactNode;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  iconSize?: string | undefined;
  iconHeight?: string | undefined;
  lineHeight?: string | number | undefined;
  mode?: 'vertical' | 'horizontal' | undefined;
  textDecoration?: string | undefined;
  align?: string | undefined;
  color?: React.CSSProperties['color'] | undefined;
  innerPadding?: string | undefined;
  containerBackgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const MjmlSocial = createMjmlElement<MjmlSocialProps>('mj-social');
