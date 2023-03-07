import {
  AnyProps,
  AnyTheme,
  FontRelatedProps,
  PaletteRelatedProps,
  ShadowRelatedProps,
  SpacingRelatedProps,
  ThemeTokenIn as ThemeTokenRef,
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
  token: ThemeTokenRef,
  theme: AnyTheme
) => {
	if (!isToken(token)) {
		return token;
  }
  const tokenSansDollar = token.toString().slice(1);

  if (palettePropKeys.some((x) => x === propertyKey)) {
    return theme.palette?.[tokenSansDollar];
  }
  if (spacingPropKeys.some((x) => x === propertyKey)) {
    return theme.spacing?.[tokenSansDollar];
  }
  if (fontPropKeys.some((x) => x === propertyKey)) {
    return theme.font?.[tokenSansDollar];
  }
  if (shadowPropKeys.some((x) => x === propertyKey)) {
    return theme.shadow?.[tokenSansDollar];
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

export const isToken = (value: unknown): value is ThemeTokenRef => {
  if (value?.toString().startsWith("$")) {
    return true;
  }
  return false;
};
