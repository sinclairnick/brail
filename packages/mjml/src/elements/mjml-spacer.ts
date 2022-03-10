import React, { CSSProperties, ReactNode } from 'react';
import { BorderProps, PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type SpacerProps = {
  children?: ReactNode;
  height?: string | number | undefined;
  width?: string | number | undefined;
  containerBackgroundColor?: CSSProperties['backgroundColor'] | undefined;
  verticalAlign?: CSSProperties['verticalAlign'] | undefined;
} & BorderProps &
  PaddingProps &
  ClassNameProps;

export const SpacerProps = createMjmlElement<SpacerProps>('mj-spacer');