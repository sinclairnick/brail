import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmAllProps = {
  [key: string]: any;
  children?: React.ReactNode | undefined;
};

export const All = createMjmlElement<MjmAllProps>('mj-all');
