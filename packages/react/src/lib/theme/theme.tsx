import { merge } from 'lodash';
import { Object } from 'ts-toolbelt';
import { TextProps } from '../components/text/text';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2';

export const createPalette = <P extends PaletteOptions>(options: P) => {
  return merge(defaultPalette, options);
};

const defaultPalette: Palette = {
  primary: {
    main: '#019C53',
    dark: '#12472C',
    contrastText: '#F0FFF7',
    light: '#e5f5ed',
  },
  secondary: {
    main: '#C1272D',
    dark: '#8C2428',
    light: '#F5E5E5',
    contrastText: '#FFF0F0',
  },
  info: {
    main: '#3381ca',
    dark: '#1E4B76',
    light: '#E2EEF8',
    contrastText: '#F3F8FC',
  },
  warning: {
    main: '#E5B438',
    dark: '#8C6F24',
    light: '#FDF4DE',
    contrastText: '#FFFBF0',
  },
  error: {
    main: '#C1272D',
    dark: '#8C2428',
    light: '#FCE0DE',
    contrastText: '#FFF0F0',
  },
  success: {
    main: '#019C53',
    dark: '#008648',
    contrastText: '#F0FFF7',
    light: '#e5f5ed',
  },
  grey: {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
  },
};

const defaultTheme: Theme = {
  typography: {
    allVariants: {},
    h1: {
      fontSize: 32,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
    },
    h4: {
      fontSize: 18,
    },
    h5: {
      fontSize: 16,
    },
    h6: {
      fontSize: 14,
    },
    body1: {
      fontSize: 16,
      color: defaultPalette.grey[700],
    },
    body2: {},
    a: {},
  },
  palette: defaultPalette,
};

type Typography = { [key in TypographyVariant]?: Partial<TextProps> } & {
  allVariants: Partial<TextProps>;
  a: Partial<TextProps>;
};
export type TypographyOptions = Object.Partial<Typography, 'deep'>;

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

type Palette = { [key in ThemeColor]: Color } & { grey: GradedColor };

export type PaletteOptions = Object.Partial<Palette, 'deep'>;

export type Theme = {
  typography: Typography;
  palette: Palette;
};

export type ThemeOptions = Object.Partial<Theme, 'deep'>;

export let theme = defaultTheme;

export const createTheme = (options: ThemeOptions) => {
  theme = merge(theme, options);
  return theme;
};
