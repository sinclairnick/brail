import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlProps = {
  children?: React.ReactNode;
  lang?: string | undefined;
  owa?: string | undefined;
};

export const Mjml = createMjmlElement<MjmlProps>('mjml');
