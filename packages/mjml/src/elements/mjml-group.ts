import React, { CSSProperties, ReactNode } from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type GroupProps = {
  children?: ReactNode;
  width?: string | number | undefined;
  verticalAlign?: CSSProperties['verticalAlign'] | undefined;
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps;

export const Group = createMjmlElement<GroupProps>('mj-group');
