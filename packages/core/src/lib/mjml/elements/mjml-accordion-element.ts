import React from 'react';

import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import { MjmlAccordionProps } from './mjml-accordion';

export type MjmlAccordionElementProps = MjmlAccordionProps & ClassNameProps;

export const MjmlAccordionElement =
  createMjmlElement<MjmlAccordionElementProps>('mj-accordion-element');
