import { CSSProperties, ReactNode } from 'react';
import { HrefProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type SocialElementProps = {
  borderRadius?: string | number | undefined;
  backgroundColor?: CSSProperties['backgroundColor'] | undefined;
  children?: ReactNode;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  iconSize?: string | undefined;
  iconHeight?: string | undefined;
  lineHeight?: string | number | undefined;
  mode?: 'vertical' | 'horizontal' | undefined;
  textDecoration?: string | undefined;
  align?: string | undefined;
  color?: CSSProperties['color'] | undefined;
  name?:
    | 'facebook'
    | 'facebook-noshare'
    | 'twitter'
    | 'twitter-noshare'
    | 'google'
    | 'google-noshare'
    | 'pinterest'
    | 'pinterest-noshare'
    | 'linkedin'
    | 'linkedin-noshare'
    | 'tumblr'
    | 'tumblr-noshare'
    | 'xing'
    | 'xing-noshare'
    | 'github'
    | 'instagram'
    | 'web'
    | 'snapchat'
    | 'youtube'
    | 'vimeo'
    | 'medium'
    | 'soundcloud'
    | 'dribbble'
    | undefined;
  src?: string | undefined;
  alt?: string | undefined;
  iconPadding?: string | undefined;
} & HrefProps &
  PaddingProps;

export const SocialElement =
  createMjmlElement<SocialElementProps>('mj-social-element');
