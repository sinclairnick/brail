import * as React from 'react';
import { Mj } from '@brail/mjml';
import { theme } from '../../theme/theme';
import { ThemeColor } from '../../theme';

export type ButtonProps = Omit<Mj.ButtonProps, 'color'> & {
  color?: ThemeColor;
  variant?: 'contained' | 'outlined';
};

export const Button = (props: ButtonProps) => {
  const { color = 'primary', variant = 'outlined', ...mjmlProps } = props;

  const lightColor = theme.palette[color].light;
  const darkColor = theme.palette[color].dark;

  const backgroundColor = variant === 'outlined' ? lightColor : darkColor;
  const fontColor = variant === 'outlined' ? darkColor : lightColor;

  return (
    <Mj.Button
      borderRadius={1000}
      fontSize={18}
      backgroundColor={backgroundColor}
      color={fontColor}
      {...mjmlProps}
    />
  );
};
