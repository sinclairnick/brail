import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type AttributesProps = {
  children?: React.ReactNode;
};

export const Attributes =
  createMjmlElement<AttributesProps>('mj-attributes');
