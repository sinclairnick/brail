import React from 'react';
import { ClassNameProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlDividerProps = {
  borderColor?: React.CSSProperties['borderColor'] | undefined;
  borderStyle?: React.CSSProperties['borderStyle'] | undefined;
  borderWidth?: string | number | undefined;
  children?: React.ReactNode;
  width?: string | number | undefined;
  containerBackgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps &
  PaddingProps;

export const MjmlDivider = createMjmlElement<MjmlDividerProps>('mj-divider');
