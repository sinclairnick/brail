import {
  SpacingValue,
  BackgroundImageProps,
  ThemedShadowProps,
  ThemedFontProps,
  ThemedBackgroundColorProps,
  ThemedColorProps,
  ThemedBorderProps,
  ThemedSpacingProps,
  BackgroundColorProps,
  ColorProps,
  BorderProps,
  SpacingProps,
  FontProps,
  ShadowProps,
} from "../attr";

type ErrorMessage<T extends string> = `Error: ${T}`;

export type ThemeTokenIn = string | number;
export type ThemeTokenRef<T extends ThemeTokenIn> = `$${T}` & string;

export type AnyPalette = { [key in ThemeTokenIn]: string };
export type AnySpacing = { [key in ThemeTokenIn]: number };
export type AnyShadow = { [key in ThemeTokenIn]: string };
export type AnyProps = { [key in ThemeTokenIn]: any };
export type AnyFont = { [key in ThemeTokenIn]: string };
export type AnyUtils = { [key in ThemeTokenIn]: (...args: any[]) => any };
export type AnyComponents = { [key: string]: string };

export type ValidateThemeTokenMap<TMap> = {
  [key in keyof TMap]: key extends ThemeTokenIn
    ? TMap[key]
    : ErrorMessage<"Theme tokens must begin with the '$' symbol">;
};

export type PaletteKey<TPalette extends AnyPalette> =
  keyof TPalette extends ThemeTokenIn ? ThemeTokenRef<keyof TPalette> : never;
export type SpacingKey<TSpacing extends AnySpacing> =
  keyof TSpacing extends ThemeTokenIn ? ThemeTokenRef<keyof TSpacing> : never;
export type ShadowKey<TShadow extends AnyShadow> =
  keyof TShadow extends ThemeTokenIn ? ThemeTokenRef<keyof TShadow> : never;
export type FontKey<TFont extends AnyFont> = keyof TFont extends ThemeTokenIn
  ? ThemeTokenRef<keyof TFont>
  : never;

export type Theme<
  TPalette extends AnyPalette,
  TSpacing extends AnySpacing,
  TShadow extends AnyShadow,
  TUtils extends AnyUtils,
  TFont extends AnyFont
> = {
  palette?: TPalette;
  spacing?: TSpacing;
  shadow?: TShadow;
  utils?: TUtils;
  font?: TFont;
};

export type AnyTheme = Theme<
  AnyPalette,
  AnySpacing,
  AnyShadow,
  AnyUtils,
  AnyFont
>;

export type AnyStyleRelatedProps = StyleRelatedProps<AnyTheme>;

export type PaletteRelatedProps<TPalette extends AnyPalette | undefined> =
  TPalette extends AnyPalette
    ? ThemedBackgroundColorProps<TPalette> & ThemedColorProps<TPalette>
    : BackgroundColorProps & ColorProps;

export type SpacingRelatedProps<TSpacing extends AnySpacing | undefined> =
  TSpacing extends AnySpacing
    ? ThemedBorderProps<TSpacing> & ThemedSpacingProps<TSpacing, SpacingValue>
    : BorderProps & SpacingProps;

export type FontRelatedProps<TFont extends AnyFont | undefined> =
  TFont extends AnyFont ? ThemedFontProps<TFont> : FontProps;

export type ShadowRelatedProps<TShadow extends AnyShadow | undefined> =
  TShadow extends AnyShadow ? ThemedShadowProps<TShadow> : ShadowProps;

export type StyleRelatedProps<TTheme extends AnyTheme> = PaletteRelatedProps<
  TTheme["palette"]
> &
  SpacingRelatedProps<TTheme["spacing"]> &
  FontRelatedProps<TTheme["font"]> &
  ShadowRelatedProps<TTheme["shadow"]> &
  BackgroundImageProps;

export type ComponentStylingProps<
  TProps extends AnyProps,
  TStyleProps extends AnyStyleRelatedProps
> = {
  [K in keyof TProps]: K extends keyof TStyleProps ? TStyleProps[K] : TProps[K];
};

export type ThemedComponentProps<
  TProps extends AnyProps,
  TTheme extends AnyTheme
> = ComponentStylingProps<TProps, StyleRelatedProps<TTheme>>;

export type StyledFn<TTheme extends AnyTheme> = <TProps extends AnyProps>(
  Component: (props: TProps) => JSX.Element,
  options?: Partial<ComponentStylingProps<TProps, StyleRelatedProps<TTheme>>>
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
