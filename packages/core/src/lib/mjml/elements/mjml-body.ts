import React from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type BodyProps = {
  children?: React.ReactNode;
  width?: number | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps;

export const Body = createMjmlElement<BodyProps>('mj-body');
