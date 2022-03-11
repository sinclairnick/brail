import { CSSProperties, ReactNode } from 'react';

import { PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type SocialProps = {
  borderRadius?: string | number | undefined;
  children?: ReactNode;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  iconSize?: string | undefined;
  iconHeight?: string | undefined;
  lineHeight?: string | number | undefined;
  mode?: 'vertical' | 'horizontal' | undefined;
  textDecoration?: string | undefined;
  align?: string | undefined;
  color?: CSSProperties['color'] | undefined;
  innerPadding?: string | undefined;
  containerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const Social = createMjmlElement<SocialProps>('mj-social');
