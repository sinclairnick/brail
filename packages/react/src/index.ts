export * from './lib/template-page/template-page';
export * from './lib/components';

// Don't reexport theme to force user to import theme
// This ensures createTheme() is run
export type {
  PaletteOptions,
  Theme,
  ThemeColor,
  ThemeOptions,
  TypographyOptions,
  TypographyVariant,
} from './lib/theme/theme';
export { createTheme, createPalette } from './lib/theme/theme';
