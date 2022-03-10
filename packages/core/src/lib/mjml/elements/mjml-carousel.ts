import React from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type CarouselProps = {
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  align?: string | undefined;
  borderRadius?: string | number | undefined;
  children?: React.ReactNode;
  thumbnails?: 'hidden' | 'visible' | undefined;
  tbBorder?: React.CSSProperties['border'] | undefined;
  tbBorderRadius?: React.CSSProperties['borderRadius'] | undefined;
  tbHoverBorderColor?: string | undefined;
  tbSelectedBorderColor?: string | undefined;
  tbWidth?: string | undefined;
  leftIcon?: string | undefined;
  rightIcon?: string | undefined;
  iconWidth?: string | undefined;
} & ClassNameProps;

export const Carousel = createMjmlElement<CarouselProps>('mj-body');
