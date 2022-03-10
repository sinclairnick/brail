import React, { Component } from 'react';
import { node } from 'prop-types';
import { createMjmlElement } from '../utils/create-mjml-element';
import { ClassNameProps, PaddingProps } from '../types';

export type MjmlAccordionTitleProps = {
  children?: React.ReactNode;
  color?: React.CSSProperties['color'] | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
} & PaddingProps &
  ClassNameProps;

export const MjmlAccordionTitle =
  createMjmlElement<MjmlAccordionTitleProps>('mj-accordion-title');
