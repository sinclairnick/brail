import React, {  ReactNode } from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';



export type CarouselProps = {
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
  align?: string | undefined;
  borderRadius?: string | number | undefined;
  children?: ReactNode;
  thumbnails?: 'hidden' | 'visible' | undefined;
  tbBorder?: CSS.Properties['border'] | undefined;
  tbBorderRadius?: CSS.Properties['borderRadius'] | undefined;
  tbHoverBorderColor?: string | undefined;
  tbSelectedBorderColor?: string | undefined;
  tbWidth?: string | undefined;
  leftIcon?: string | undefined;
  rightIcon?: string | undefined;
  iconWidth?: string | undefined;
} & ClassNameProps;

export const Carousel = createMjmlElement<CarouselProps>('mj-carousel');
