import React, { ReactNode } from 'react';
import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type DividerProps = {
  borderColor?: CSS.Properties['borderColor'] | undefined;
  borderStyle?: CSS.Properties['borderStyle'] | undefined;
  borderWidth?: string | number | undefined;
  children?: ReactNode;
  width?: string | number | undefined;
  containerBackgroundColor?: CSS.Properties['backgroundColor'] | undefined;
} & ClassNameProps &
  PaddingProps;

export const Divider = createMjmlElement<DividerProps>('mj-divider');
