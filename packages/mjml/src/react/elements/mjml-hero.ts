import { CSSProperties, ReactNode } from 'react';
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
  backgroundPosition?: CSSProperties['backgroundPosition'] | undefined;
  verticalAlign?: CSSProperties['verticalAlign'] | undefined;
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps &
  PaddingProps;

export const Hero = createMjmlElement<HeroProps>('mj-hero');
