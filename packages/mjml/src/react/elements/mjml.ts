import React, { ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlProps = {
  children?: ReactNode;
  lang?: string | undefined;
  owa?: string | undefined;
};

export const Mjml = createMjmlElement<MjmlProps>('mjml');
