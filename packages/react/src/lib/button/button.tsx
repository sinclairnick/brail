import { Mj } from '@brail/core';
import { theme, ThemeColor } from '../theme/theme';

export type ButtonProps = Omit<Mj.ButtonProps, 'color'> & {
  color?: ThemeColor;
  variant?: 'contained' | 'outlined';
};

export const Button = (props: ButtonProps) => {
  const { color = 'primary', variant = 'outlined' } = props;

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
      {...props}
    />
  );
};
