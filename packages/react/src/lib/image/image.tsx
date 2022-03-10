import { Mj } from '@brail/core';

export type ImageProps = Mj.ImageProps;

const vercelUrl =
  process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:7777'
    : process.env['NEXT_PUBLIC_VERCEL_URL'] ?? '';

export const Image = (props: ImageProps) => {
  const { src, ...rest } = props;

  const _src = src?.startsWith('/') ? `${vercelUrl}${src}` : src;

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
