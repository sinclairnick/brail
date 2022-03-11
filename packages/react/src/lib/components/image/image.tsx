import React from 'react';
import { Mj } from '@brail/mjml';

export type ImageProps = Omit<Mj.ImageProps, 'src'> & { src: string };

const NODE_ENV = process.env['NODE_ENV'];
const PORT = process.env['NEXT_PUBLIC_PORT'];
const HOSTNAME = process.env['NEXT_PUBLIC_HOSTNAME'];

/** Force absolute URL name */
const getSrcUrl = (url: string) => {
  if (!url.startsWith('/')) {
    // Is already absolute path
    return url;
  }

  if (HOSTNAME !== undefined) {
    return `${HOSTNAME}${url}`;
  }

  if (NODE_ENV === 'development') {
    if (PORT === undefined) {
      throw new Error(
        'Please specify the NEXT_PUBLIC_PORT env variable to allow absolute image paths'
      );
    }
    return `http://localhost:${PORT}${url}`;
  }

  throw new Error(
    'Could not automatically determine host for image URLs. Please provide a NEXT_PUBLIC_HOSTNAME explicitly'
  );
};

export const Image = (props: ImageProps) => {
  const { src, ...rest } = props;

  const _src = getSrcUrl(src);

  return (
    <Mj.Image
      paddingBottom={0}
      paddingTop={0}
      paddingLeft={0}
      paddingRight={0}
      src={_src}
      {...rest}
    />
  );
};
