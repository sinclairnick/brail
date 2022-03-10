import React from 'react';

import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type HeroProps = {
  children?: React.ReactNode;
  width?: string | number | undefined;
  height?: string | number | undefined;
  mode?: 'fluid-height' | 'fixed-height' | undefined;
  backgroundWidth?: string | undefined;
  backgroundHeight?: string | undefined;
  backgroundUrl?: string | undefined;
  backgroundPosition?: React.CSSProperties['backgroundPosition'] | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps &
  PaddingProps;

export const Hero = createMjmlElement<HeroProps>('mj-body');
