import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type ClassProps = {
  [key: string]: any;
  children?: React.ReactNode | undefined;
  name: string;
};

export const Class = createMjmlElement<ClassProps>('mj-class');
