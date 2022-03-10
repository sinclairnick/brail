import React, { Component } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlNavbarProps = {
  baseUrl?: string | undefined;
  children?: React.ReactNode;
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
  icoColor?: React.CSSProperties['color'] | undefined;
  icoFontSize?: string | undefined;
  icoTextTransform?: string | undefined;
  icoTextDecoration?: string | undefined;
  icoLineHeight?: string | undefined;
};

export const MjmlNavbar = createMjmlElement<MjmlNavbarProps>('mj-navbar');
