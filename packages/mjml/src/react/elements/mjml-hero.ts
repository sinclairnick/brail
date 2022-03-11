import React, { ReactNode } from 'react';
import CSS from 'csstype';
import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type HeroProps = {
  children?: ReactNode;
  width?: string | number | undefined;
  height?: string | number | undefined;
  mode?: 'fluid-height' | 'fixed-height' | undefined;
  backgroundWidth?: string | undefined;
  backgroundHeight?: string | undefined;
  backgroundUrl?: string | undefined;
  backgroundPosition?: CSS.Properties['backgroundPosition'] | undefined;
  verticalAlign?: CSS.Properties['verticalAlign'] | undefined;
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
} & ClassNameProps &
  PaddingProps;

export const Hero = createMjmlElement<HeroProps>('mj-hero');
