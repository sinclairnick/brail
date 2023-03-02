import { createTheme } from "./theme";
import {
  AnyFont,
  AnyPalette,
  AnyShadow,
  AnySpacing,
  AnyTheme,
  AnyUtils,
  ValidateThemeTokenMap,
} from "./theme.types";

const createNewBuilder = <TTheme extends AnyTheme>(theme: TTheme) => {
  return new ThemeBuilder<TTheme>(theme);
};

export class ThemeBuilder<TTheme extends AnyTheme = AnyTheme> {
  public _def = {} as TTheme;

  constructor(theme?: TTheme) {
    if (theme) {
      this._def = theme;
    }
  }

  public font<TFont extends AnyFont>(font: ValidateThemeTokenMap<TFont>) {
    return createNewBuilder<{
      palette: TTheme["palette"];
      spacing: TTheme["spacing"];
      shadow: TTheme["shadow"];
      utils: TTheme["utils"];
      font: TFont;
    }>({
      ...this._def,
      font,
    } as any);
  }

  public palette<TPalette extends AnyPalette>(
    palette: ValidateThemeTokenMap<TPalette>
  ) {
    return createNewBuilder<{
      palette: TPalette;
      spacing: TTheme["spacing"];
      shadow: TTheme["shadow"];
      utils: TTheme["utils"];
      font: TTheme["font"];
    }>({
      ...this._def,
      palette,
    } as any);
  }

  public shadow<TShadow extends AnyShadow>(
    shadow: ValidateThemeTokenMap<TShadow>
  ) {
    return createNewBuilder<{
      palette: TTheme["palette"];
      spacing: TTheme["spacing"];
      shadow: TShadow;
      utils: TTheme["utils"];
      font: TTheme["font"];
    }>({
      ...this._def,
      shadow,
    } as any);
  }

  public spacing<TSpacing extends AnySpacing>(
    spacing: ValidateThemeTokenMap<TSpacing>
  ) {
    return createNewBuilder<{
      palette: TTheme["palette"];
      spacing: TSpacing;
      shadow: TTheme["shadow"];
      utils: TTheme["utils"];
      font: TTheme["font"];
    }>({
      ...this._def,
      spacing,
    } as any);
  }

  public utils<TUtils extends AnyUtils>(utils: ValidateThemeTokenMap<TUtils>) {
    return createNewBuilder<{
      palette: TTheme["palette"];
      spacing: TTheme["spacing"];
      shadow: TTheme["shadow"];
      utils: TUtils;
      font: TTheme["font"];
    }>({
      ...this._def,
      utils,
    } as any);
  }

  public create() {
    return createTheme(this._def);
  }
}

export const createThemeBuilder = () => {
  return new ThemeBuilder();
};

export type AnyThemeBuilder = ThemeBuilder<any>;
