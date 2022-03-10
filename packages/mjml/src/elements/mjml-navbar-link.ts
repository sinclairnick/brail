import React, { CSSProperties, ReactNode } from 'react';

import { HrefProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type NavbarLinkProps = {
  children?: ReactNode;
  color?: CSSProperties['color'] | undefined;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  fontStyle?: string | undefined;
  fontWeight?: number | undefined;
  lineHeight?: string | number | undefined;
  textDecoration?: string | undefined;
  textTransform?: string | undefined;
} & HrefProps &
  PaddingProps;

export const NavbarLink =
  createMjmlElement<NavbarLinkProps>('mj-navbar-link');
