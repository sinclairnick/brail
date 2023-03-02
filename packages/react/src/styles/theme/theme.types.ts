import {
  SpacingValue,
  BackgroundImageProps,
  ThemedShadowProps,
  ThemedFontProps,
  ThemedBackgroundColorProps,
  ThemedColorProps,
  ThemedBorderProps,
  ThemedSpacingProps,
} from "../attr";

type ErrorMessage<T extends string> = `Error: ${T}`;

export type ThemeToken = `$${string}` & string;

export type AnyPalette = { [key in ThemeToken]: string };
export type AnySpacing = { [key in ThemeToken]: number };
export type AnyShadow = { [key in ThemeToken]: string };
export type AnyUtils = { [key in ThemeToken]: (...args: any[]) => any };
export type AnyProps = { [key in ThemeToken]: any };
export type AnyFont = { [key in ThemeToken]: string };
export type AnyComponents = { [key: string]: string };

export type ValidateThemeTokenMap<TMap> = {
  [key in keyof TMap]: key extends ThemeToken
    ? TMap[key]
    : ErrorMessage<"Theme tokens must begin with the '$' symbol">;
};

export type PaletteKey<TPalette extends AnyPalette> =
  keyof TPalette extends ThemeToken ? keyof TPalette : never;
export type SpacingKey<TSpacing extends AnySpacing> =
  keyof TSpacing extends ThemeToken ? keyof TSpacing : never;
export type ShadowKey<TShadow extends AnyShadow> =
  keyof TShadow extends ThemeToken ? keyof TShadow : never;
export type FontKey<TFont extends AnyFont> = keyof TFont extends ThemeToken
  ? keyof TFont
  : never;

export type Theme<
  TPalette extends AnyPalette,
  TSpacing extends AnySpacing,
  TShadow extends AnyShadow,
  TUtils extends AnyUtils,
  TFont extends AnyFont
> = {
  palette: TPalette;
  spacing: TSpacing;
  shadow: TShadow;
  utils: TUtils;
  font: TFont;
};

export type AnyTheme = Theme<
  AnyPalette,
  AnySpacing,
  AnyShadow,
  AnyUtils,
  AnyFont
>;

export type AnyStyleProps = StyleProps<AnyTheme>;

export type PaletteRelatedProps<TPalette extends AnyPalette> =
  ThemedBackgroundColorProps<TPalette> & ThemedColorProps<TPalette>;

export type SpacingRelatedProps<TSpacing extends AnySpacing> =
  ThemedBorderProps<TSpacing> & ThemedSpacingProps<TSpacing, SpacingValue>;

export type FontRelatedProps<TFont extends AnyFont> = ThemedFontProps<TFont>;

export type ShadowRelatedProps<TShadow extends AnyShadow> =
  ThemedShadowProps<TShadow>;

export type StyleProps<TTheme extends AnyTheme> = PaletteRelatedProps<
  TTheme["palette"]
> &
  SpacingRelatedProps<TTheme["spacing"]> &
  FontRelatedProps<TTheme["font"]> &
  ShadowRelatedProps<TTheme["shadow"]> &
  BackgroundImageProps;
// TODO: Untokenize for this
// &
// Omit<EmailProps, "children">;

export type ComponentStylingProps<
  TProps extends AnyProps,
  TStyleProps extends AnyStyleProps
> = {
  [K in keyof TProps]: K extends keyof TStyleProps ? TStyleProps[K] : TProps[K];
};

export type ThemedComponentProps<
  TProps extends AnyProps,
  TTheme extends AnyTheme
> = ComponentStylingProps<TProps, StyleProps<TTheme>>;

export type StyledFn<TTheme extends AnyTheme> = <TProps extends AnyProps>(
  Component: (props: TProps) => JSX.Element,
  options?: Partial<ComponentStylingProps<TProps, StyleProps<TTheme>>>
) => (props: ThemedComponentProps<TProps, TTheme>) => JSX.Element;

export type ExtendFn<TTheme extends AnyTheme> = <TNewTheme extends AnyTheme>(
  theme: TNewTheme
) => CreateThemeReturn<{
  font: TTheme["font"] & TNewTheme["font"];
  palette: TTheme["palette"] & TNewTheme["palette"];
  shadow: TTheme["shadow"] & TNewTheme["shadow"];
  spacing: TTheme["spacing"] & TNewTheme["spacing"];
  utils: TTheme["utils"] & TNewTheme["utils"];
}>;

export type CreateThemeArgs<TTheme extends AnyTheme> = Partial<TTheme>;

export type CreateThemeReturn<TTheme extends AnyTheme> = {
  config: TTheme;
  styled: StyledFn<TTheme>;
  utils: TTheme["utils"];
  extend: ExtendFn<TTheme>;
};
