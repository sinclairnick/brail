import { HrefProps, PaddingProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlSocialElementProps = {
  borderRadius?: string | number | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
  children?: React.ReactNode;
  fontFamily?: string | undefined;
  fontSize?: string | number | undefined;
  iconSize?: string | undefined;
  iconHeight?: string | undefined;
  lineHeight?: string | number | undefined;
  mode?: 'vertical' | 'horizontal' | undefined;
  textDecoration?: string | undefined;
  align?: string | undefined;
  color?: React.CSSProperties['color'] | undefined;
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

export const MjmlSocialElement =
  createMjmlElement<MjmlSocialElementProps>('mj-social-element');
