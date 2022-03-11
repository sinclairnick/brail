import React, { ReactNode } from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type GroupProps = {
  children?: ReactNode;
  width?: string | number | undefined;
  verticalAlign?: CSS.Properties['verticalAlign'] | undefined;
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
} & ClassNameProps;

export const Group = createMjmlElement<GroupProps>('mj-group');
