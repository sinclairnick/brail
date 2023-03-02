import {
  AnyProps,
  AnyTheme,
  FontRelatedProps,
  PaletteRelatedProps,
  ShadowRelatedProps,
  SpacingRelatedProps,
  ThemeToken,
} from "..";

const palettePropKeys: Array<keyof PaletteRelatedProps<any>> = [
  "backgroundColor",
  "color",
];

const spacingPropKeys: Array<keyof SpacingRelatedProps<any>> = [
  "border",
  "borderBottom",
  "borderColor",
  "borderLeft",
  "borderRadius",
  "borderRight",
  "borderStyle",
  "borderTop",
  "borderWidth",
  "m",
  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "mb",
  "ml",
  "mr",
  "mt",
  "mx",
  "my",
  "p",
  "padding",
  "paddingBottom",
  "paddingLeft",
  "paddingTop",
  "paddingRight",
  "pb",
  "pl",
  "pr",
  "pt",
  "px",
  "py",
];

const fontPropKeys: Array<keyof FontRelatedProps<any>> = ["fontFamily"];

const shadowPropKeys: Array<keyof ShadowRelatedProps<any>> = ["boxShadow"];

export const substituteToken = (
  propertyKey: string,
  token: string,
  theme: AnyTheme
) => {
  if (!isToken(token)) {
    return token;
  }
  if (palettePropKeys.some((x) => x === propertyKey)) {
    return theme.palette?.[token];
  }
  if (spacingPropKeys.some((x) => x === propertyKey)) {
    return theme.spacing?.[token];
  }
  if (fontPropKeys.some((x) => x === propertyKey)) {
    return theme.font?.[token];
  }
  if (shadowPropKeys.some((x) => x === propertyKey)) {
    return theme.shadow?.[token];
  }
  throw new Error(
    `Unable to find value for token, { ${propertyKey}: ${token} }`
  );
};

export const substitutePropsTokens = <
  TProps extends AnyProps,
  TTheme extends AnyTheme
>(
  props: TProps,
  theme: TTheme
): TProps => {
  const newProps = { ...props } as AnyProps;
  for (const [key, value] of Object.entries(props)) {
    if (isToken(value)) {
      newProps[key as keyof AnyProps] = substituteToken(key, value, theme);
    }
  }
  return newProps as TProps;
};

export const isToken = <T extends any>(
  value: T | ThemeToken
): value is ThemeToken => {
  if (value?.toString().startsWith("$")) {
    return true;
  }
  return false;
};
