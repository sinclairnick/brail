import React, { Component } from 'react';

import { HrefProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlNavbarLinkProps = {
  children?: React.ReactNode;
  color?: React.CSSProperties['color'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  fontStyle?: string | undefined;
  fontWeight?: number | undefined;
  lineHeight?: string | number | undefined;
  textDecoration?: string | undefined;
  textTransform?: string | undefined;
} & HrefProps &
  PaddingProps;

export const MjmlNavbarLink =
  createMjmlElement<MjmlNavbarLinkProps>('mj-navbar-link');
