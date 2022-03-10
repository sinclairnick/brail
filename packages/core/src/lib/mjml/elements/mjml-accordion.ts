import React, { Component } from 'react';

import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlAccordionProps = {
  children?: React.ReactNode;
  fontFamily?: string | undefined;
  iconAlign?: string | undefined;
  iconWrappedUrl?: string | undefined;
  iconWrappedAlt?: string | undefined;
  iconUnwrappedAlt?: string | undefined;
  iconUnwrappedUrl?: string | undefined;
  iconPosition?: 'left' | 'right' | undefined;
  iconHeight?: string | undefined;
  iconWidth?: string | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
};

export const MjmlAccordion = createMjmlElement('mj-accordion');
