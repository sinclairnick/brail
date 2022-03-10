import React, { ReactNode } from 'react';
import { ClassNameProps, HrefProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type CarouselImageProps = {
  children?: ReactNode;
  src?: string | undefined;
  thumbnailsSrc?: string | undefined;
  alt?: string | undefined;
  title?: string | undefined;
} & ClassNameProps &
  HrefProps;

export const CarouselImage =
  createMjmlElement<CarouselImageProps>('mj-carousel-image');
