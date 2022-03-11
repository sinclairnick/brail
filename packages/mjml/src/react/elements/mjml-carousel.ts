import { CSSProperties, ReactNode } from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type CarouselProps = {
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
  align?: string | undefined;
  borderRadius?: string | number | undefined;
  children?: ReactNode;
  thumbnails?: 'hidden' | 'visible' | undefined;
  tbBorder?: CSSProperties['border'] | undefined;
  tbBorderRadius?: CSSProperties['borderRadius'] | undefined;
  tbHoverBorderColor?: string | undefined;
  tbSelectedBorderColor?: string | undefined;
  tbWidth?: string | undefined;
  leftIcon?: string | undefined;
  rightIcon?: string | undefined;
  iconWidth?: string | undefined;
} & ClassNameProps;

export const Carousel = createMjmlElement<CarouselProps>('mj-carousel');
