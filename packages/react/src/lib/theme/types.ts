import { TextProps } from '../components/text/text';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2';

export type Typography = { [key in TypographyVariant]?: Partial<TextProps> } & {
  allVariants: Partial<Omit<TextProps, 'children'>>;
  a: Partial<Omit<TextProps, 'children'>>;
};

export type TypographyOptions = DeepPartial<Typography>;

type Color = {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
};
type GradedColor = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
};
export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'error'
  | 'success';

export type Palette = { [key in ThemeColor]: Color } & { grey: GradedColor };

export type PaletteOptions = DeepPartial<Palette>;

export type Theme = {
  typography: Typography;
  palette: Palette;
};

export type ThemeOptions = DeepPartial<Theme>;
