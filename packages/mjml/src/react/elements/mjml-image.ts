import { CSSProperties, ReactNode } from 'react';
import { PaddingProps, ClassNameProps, HrefProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type ImageProps = {
  children?: ReactNode;
  containerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
  border?: CSSProperties['border'] | undefined;
  borderRadius?: string | number | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  src?: string | undefined;
  srcset?: string | undefined;
  alt?: string | undefined;
  align?: string | undefined;
  title?: string | undefined;
  fluidOnMobile?: string | undefined;
} & PaddingProps &
  ClassNameProps &
  HrefProps;

export const Image = createMjmlElement<ImageProps>('mj-image');
