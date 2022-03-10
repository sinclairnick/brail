import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlAttributesProps = {
  children?: React.ReactNode;
};

export const MjmlAttributes =
  createMjmlElement<MjmlAttributesProps>('mj-attributes');
