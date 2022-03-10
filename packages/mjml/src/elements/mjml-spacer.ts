import React, { ReactNode } from 'react';
import { BorderProps, PaddingProps, ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type SpacerProps = {
  children?: ReactNode;
  height?: string | number | undefined;
  width?: string | number | undefined;
  containerBackgroundColor?: CSS.Properties['backgroundColor'] | undefined;
  verticalAlign?: CSS.Properties['verticalAlign'] | undefined;
} & BorderProps &
  PaddingProps &
  ClassNameProps;

export const SpacerProps = createMjmlElement<SpacerProps>('mj-spacer');
