import React, { ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type AttributesProps = {
  children?: ReactNode;
};

export const Attributes =
  createMjmlElement<AttributesProps>('mj-attributes');
