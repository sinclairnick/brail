import React from 'react';
import { BorderProps, ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type WrapperProps = {
  children?: React.ReactNode;
  fullWidth?: boolean | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  backgroundUrl?: string | undefined;
  backgroundRepeat?: React.CSSProperties['backgroundRepeat'] | undefined;
  backgroundSize?: React.CSSProperties['backgroundSize'] | undefined;
  backgroundPosition?: React.CSSProperties['backgroundPosition'] | undefined;
  backgroundPositionX?: React.CSSProperties['backgroundPositionX'] | undefined;
  backgroundPositionY?: React.CSSProperties['backgroundPositionY'] | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
  textAlign?: React.CSSProperties['textAlign'] | undefined;
} & BorderProps &
  PaddingProps &
  ClassNameProps;

export const Wrapper = createMjmlElement<WrapperProps>('mj-wrapper');
