import React, { CSSProperties, ReactNode } from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type BodyProps = {
  children?: ReactNode;
  width?: number | undefined;
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
} & ClassNameProps;

export const Body = createMjmlElement<BodyProps>('mj-body');
