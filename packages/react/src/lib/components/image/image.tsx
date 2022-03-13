import * as React from 'react';
import { Mj } from '@brail/mjml';
import invariant from 'tiny-invariant';
import { checkIsAbsoluteUrl } from '../../constants/absolute-path';
export type ImageProps = Omit<Mj.ImageProps, 'src'> & { src: string };

export const Image = (props: ImageProps) => {
  const { src, ...rest } = props;

  invariant(
    checkIsAbsoluteUrl(src),
    `Image 'src' attributes must be absolute to ensure they work in email clients`
  );

  return (
    <Mj.Image
      paddingBottom={0}
      paddingTop={0}
      paddingLeft={0}
      paddingRight={0}
      src={src}
      {...rest}
    />
  );
};
