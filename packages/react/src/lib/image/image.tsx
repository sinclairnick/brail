import { MjmlImage } from '@brail/core';
import { MjmlType } from '../types';

export type ImageProps = MjmlType<MjmlImage>;

const vercelUrl =
  process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:7777'
    : process.env['NEXT_PUBLIC_VERCEL_URL'] ?? '';

export const Image = (props: ImageProps) => {
  const { src, ...rest } = props;

  const _src = src?.startsWith('/') ? `${vercelUrl}${src}` : src;

  return (
    <MjmlImage
      paddingBottom={0}
      paddingTop={0}
      paddingLeft={0}
      paddingRight={0}
      src={_src}
      {...rest}
    />
  );
};
