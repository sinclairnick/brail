import React, { CSSProperties, ReactNode } from 'react';
import CSS from 'csstype';

import { createMjmlElement } from '../utils/create-mjml-element';

export type AccordionProps = {
  children?: ReactNode;
  fontFamily?: string | undefined;
  iconAlign?: string | undefined;
  iconWrappedUrl?: string | undefined;
  iconWrappedAlt?: string | undefined;
  iconUnwrappedAlt?: string | undefined;
  iconUnwrappedUrl?: string | undefined;
  iconPosition?: 'left' | 'right' | undefined;
  iconHeight?: string | undefined;
  iconWidth?: string | undefined;
  backgroundColor?: CSS.Properties['backgroundColor'] | undefined;
};

export const Accordion = createMjmlElement('mj-accordion');
