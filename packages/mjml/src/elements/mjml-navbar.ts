import React, { ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';
import CSS from 'csstype';

export type NavbarProps = {
  baseUrl?: string | undefined;
  children?: ReactNode;
  hamburger?: 'hamburger' | undefined;
  align?: string | undefined;
  icoOpen?: string | undefined;
  icoClose?: string | undefined;
  icoPadding?: string | undefined;
  icoPaddingTop?: string | undefined;
  icoPaddingRight?: string | undefined;
  icoPaddingBottom?: string | undefined;
  icoPaddingLeft?: string | undefined;
  icoAlign?: string | undefined;
  icoColor?: CSS.Properties['color'] | undefined;
  icoFontSize?: string | undefined;
  icoTextTransform?: string | undefined;
  icoTextDecoration?: string | undefined;
  icoLineHeight?: string | undefined;
};

export const Navbar = createMjmlElement<NavbarProps>('mj-navbar');
