import * as React from 'react';
import { Mj } from '@brail/mjml';
import { theme } from '../../theme/theme';

export type TypographyProps = Mj.TextProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
};

export const Typography = (props: TypographyProps) => {
  const { variant = 'body1', ...rest } = props;

  const variantProps = theme.typography[variant];

  return (
    <Mj.Text
      fontFamily={theme.typography?.allVariants?.fontFamily}
      {...variantProps}
      {...rest}
    />
  );
};
