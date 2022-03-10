import React, { CSSProperties, ReactNode } from 'react';
import { BorderProps, ClassNameProps, PaddingProps } from '../types';

import { createMjmlElement } from '../utils/create-mjml-element';

export type SectionProps = {
  children?: ReactNode;
  fullWidth?: boolean | undefined;
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
  backgroundUrl?: string | undefined;
  backgroundRepeat?: CSSProperties['backgroundRepeat'] | undefined;
  backgroundSize?: CSSProperties['backgroundSize'] | undefined;
  backgroundPosition?: CSSProperties['backgroundPosition'] | undefined;
  backgroundPositionX?: CSSProperties['backgroundPositionX'] | undefined;
  backgroundPositionY?: CSSProperties['backgroundPositionY'] | undefined;
  verticalAlign?: CSSProperties['verticalAlign'] | undefined;
  textAlign?: CSSProperties['textAlign'] | undefined;
  direction?: 'ltr' | 'rtl' | undefined;
} & BorderProps &
  PaddingProps &
  ClassNameProps;

export const Section = createMjmlElement<SectionProps>('mj-section');
