import React from 'react';
import { ClassNameProps, HrefProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlCarouselImageProps = {
  children?: React.ReactNode;
  src?: string | undefined;
  thumbnailsSrc?: string | undefined;
  alt?: string | undefined;
  title?: string | undefined;
} & ClassNameProps &
  HrefProps;

export const MjmlCarouselImage =
  createMjmlElement<MjmlCarouselImageProps>('mj-carousel-image');
