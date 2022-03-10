import React from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type GroupProps = {
  children?: React.ReactNode;
  width?: string | number | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps;

export const Group = createMjmlElement<GroupProps>('mj-body');
