import { MjmlText, MjmlTextProps } from '@brail/core';
import { theme } from '../theme/theme';

export type TextProps = MjmlTextProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
};

export const Text = (props: TextProps) => {
  const { variant = 'body1', ...rest } = props;

  const variantProps = theme.typography[variant];

  return (
    <MjmlText
      fontFamily={theme.typography?.allVariants?.fontFamily}
      {...variantProps}
      {...rest}
    />
  );
};
