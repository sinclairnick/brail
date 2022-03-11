import { ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type ClassProps = {
  [key: string]: any;
  children?: ReactNode | undefined;
  name: string;
};

export const Class = createMjmlElement<ClassProps>('mj-class');
