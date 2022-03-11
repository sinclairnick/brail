import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';
import { AccordionProps } from './mjml-accordion';

export type AccordionElementProps = AccordionProps & ClassNameProps;

export const AccordionElement = createMjmlElement<AccordionElementProps>(
  'mj-accordion-element'
);
