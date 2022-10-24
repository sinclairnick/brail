import { CSSProperties, ReactNode } from 'react';
import { PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type TextProps = {
  children?: ReactNode;
  color?: CSSProperties['color'] | undefined;
  fontFamily?: CSSProperties['fontFamily'] | undefined;
  fontSize?: CSSProperties['fontSize'] | undefined;
  fontStyle?: CSSProperties['fontStyle'] | undefined;
  fontWeight?: CSSProperties['fontWeight'] | undefined;
  lineHeight?: CSSProperties['lineHeight'] | undefined;
  letterSpacing?: CSSProperties['letterSpacing'] | undefined;
  height?: CSSProperties['height'] | undefined;
  textDecoration?: CSSProperties['textDecoration'] | undefined;
  textTransform?: CSSProperties['textTransform'] | undefined;
  align?: CSSProperties['textAlign'] | undefined;
  containerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & PaddingProps &
  ClassNameProps;

export const Text = createMjmlElement<TextProps>('mj-text');
