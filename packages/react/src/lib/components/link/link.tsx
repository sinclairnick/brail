import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import invariant from 'tiny-invariant';
import { checkIsAbsoluteUrl } from '../../constants/absolute-path';

export type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

/** A wrapper for <a/> which throws if the src is non-absolute */
export function Link(props: LinkProps) {
  invariant(
    checkIsAbsoluteUrl(props.href ?? ''),
    "Link 'href' must be absolute to ensure it works in an email client"
  );
  return <a {...props} />;
}

export default Link;
