// Type definitions for mjml-react 2.0
// Project: https://github.com/wix-incubator/mjml-react
// Definitions by: Henri Normak <https://github.com/henrinormak>
//                 Ian Edington <https://github.com/IanEdington>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import * as React from 'react';

export function renderToMjml(email: React.ReactElement): string;

export interface Mjml2HtmlOptions {
  fonts?: { [key: string]: string } | undefined;
  keepComments?: boolean | undefined;
  beautify?: boolean | undefined;
  minify?: boolean | undefined;
  validationLevel?: 'strict' | 'soft' | 'skip' | undefined;
  filePath?: string | undefined;
}

export interface MjmlError {
  line: number;
  message: string;
  tagName: string;
  formattedMessage: string;
}

export function render(
  email: React.ReactElement,
  options?: Mjml2HtmlOptions
): { html: string; errors: MjmlError[] };

// Components

/**
 * @deprecated forcing MJML components to define children prevents them from being used in the header element see https://github.com/wix-incubator/mjml-react/issues/32
 */
export interface RequiredChildrenProps {
  children: React.ReactNode;
}

export interface PaddingProps {
  padding?: string | number | undefined;
  paddingTop?: string | number | undefined;
  paddingRight?: string | number | undefined;
  paddingBottom?: string | number | undefined;
  paddingLeft?: string | number | undefined;
}

export interface BorderProps {
  border?: string | undefined;
  borderBottom?: string | undefined;
  borderLeft?: string | undefined;
  borderTop?: string | undefined;
  borderRight?: string | undefined;
  borderRadius?: string | number | undefined;
}

export interface InnerBorderProps {
  innerBorder?: string | undefined;
  innerBorderBottom?: string | undefined;
  innerBorderLeft?: string | undefined;
  innerBorderTop?: string | undefined;
  innerBorderRight?: string | undefined;
  innerBorderRadius?: string | number | undefined;
}

export interface ClassNameProps {
  cssClass?: string | undefined;
  mjClass?: string | undefined;
}

export interface HrefProps {
  href?: string | undefined;
  target?: string | undefined;
  rel?: string | undefined;
}

// mjml
export interface MjmlProps {
  children?: React.ReactNode;
  lang?: string | undefined;
  owa?: string | undefined;
}

export class Mjml extends React.Component<MjmlProps> {}

// mj-head
export class MjmlHead extends React.Component<{ children?: React.ReactNode }> {}

// mj-attributes
export class MjmlAttributes extends React.Component<{
  children?: React.ReactNode;
}> {}
export class MjmlAll extends React.Component<{
  [key: string]: any;
  children?: React.ReactNode | undefined;
}> {}
export class MjmlClass extends React.Component<{}> {}

// mj-breakpoint
export interface MjmlBreakpointProps {
  width?: string | number | undefined;
}

export class MjmlBreakpoint extends React.Component<MjmlBreakpointProps> {}

export class MjmlFont extends React.Component<MjmlFontProps> {}

// mj-preview
export class MjmlPreview extends React.Component<{}> {}

// mj-style
export class MjmlStyle extends React.Component<{
}> {}

// mj-title
export class MjmlTitle extends React.Component<{
}> {}

export interface MjmlColumnProps {
  children?: React.ReactNode;
  width?: string | number | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  innerBackgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
}

export class MjmlColumn extends React.Component<
  MjmlColumnProps &
    PaddingProps &
    ClassNameProps &
    BorderProps &
    InnerBorderProps
> {}

// mj-divider

// mj-group
export interface MjmlGroupProps {
  children?: React.ReactNode;
  width?: string | number | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
}

export class MjmlGroup extends React.Component<
  MjmlGroupProps & ClassNameProps
> {}

// mj-raw

// mj-section
export interface MjmlSectionProps {
  children?: React.ReactNode;
  fullWidth?: boolean | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  backgroundUrl?: string | undefined;
  backgroundRepeat?: React.CSSProperties['backgroundRepeat'] | undefined;
  backgroundSize?: React.CSSProperties['backgroundSize'] | undefined;
  backgroundPosition?: React.CSSProperties['backgroundPosition'] | undefined;
  backgroundPositionX?: React.CSSProperties['backgroundPositionX'] | undefined;
  backgroundPositionY?: React.CSSProperties['backgroundPositionY'] | undefined;
  verticalAlign?: React.CSSProperties['verticalAlign'] | undefined;
  textAlign?: React.CSSProperties['textAlign'] | undefined;
  direction?: 'ltr' | 'rtl' | undefined;
}

export class MjmlSection extends React.Component<
  MjmlSectionProps & BorderProps & PaddingProps & ClassNameProps
> {}

// mj-social

// mj-spacer

// mj-table

// mj-text

// mj-wrapper
