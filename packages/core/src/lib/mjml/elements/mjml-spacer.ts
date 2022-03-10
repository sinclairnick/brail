import React from 'react';
import { BorderProps, PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type SpacerProps = {
  children?: React.ReactNode;
  height?: string | number | undefined;
  width?: string | number | undefined;
  containerBackgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
} & BorderProps &
  PaddingProps &
  ClassNameProps;

export const SpacerProps = createMjmlElement<SpacerProps>('mj-body');