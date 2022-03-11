import { CSSProperties, ReactNode } from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type BodyProps = {
  children?: ReactNode;
  width?: number | undefined;
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps;

export const Body = createMjmlElement<BodyProps>('mj-body');
