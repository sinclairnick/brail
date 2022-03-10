import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlClassProps = {
  [key: string]: any;
  children?: React.ReactNode | undefined;
  name: string;
};

export const MjmlClass = createMjmlElement<MjmlClassProps>('mj-class');
