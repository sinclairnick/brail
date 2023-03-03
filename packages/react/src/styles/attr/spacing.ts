import { NormalizedAttribute } from "../../util/normalize-attributes";
import { AnySpacing, SpacingKey } from "../theme";
import { isToken } from "../theme/theme.util";
import { getPxValue } from "./dimensions";
import { MultiSpacingValue, SpacingValue } from "./units";

export type MarginLonghand<T extends SpacingValue = SpacingValue> = {
  margin: T;
  marginTop: T;
  marginRight: T;
  marginBottom: T;
  marginLeft: T;
};

export type MarginShorthand<T extends SpacingValue = SpacingValue> = {
  m: T;
  mt: T;
  mr: T;
  mb: T;
  ml: T;
  mx: T;
  my: T;
};

export type PaddingLonghand<T extends SpacingValue = SpacingValue> = {
  padding: T;
  paddingTop: T;
  paddingRight: T;
  paddingBottom: T;
  paddingLeft: T;
};

export type PaddingShorthand<T extends SpacingValue = SpacingValue> = {
  p: T;
  pt: T;
  pr: T;
  pb: T;
  pl: T;
  px: T;
  py: T;
};

export type SpacingLonghand<T extends SpacingValue = SpacingValue> =
  MarginLonghand<T> & PaddingLonghand<T>;
export type SpacingShorthand<T extends SpacingValue = SpacingValue> =
  MarginShorthand<T> & PaddingShorthand<T>;
export type MarginProps<T extends SpacingValue = SpacingValue> =
  MarginLonghand<T> & MarginShorthand<T>;
export type PaddingProps<T extends SpacingValue = SpacingValue> =
  PaddingLonghand<T> & PaddingShorthand<T>;

export type MarginStyle<T extends SpacingValue> = {
  marginTop: T;
  marginBottom: T;
  marginLeft: T;
  marginRight: T;
};

export type PaddingStyle<T extends SpacingValue> = {
  paddingTop: T;
  paddingBottom: T;
  paddingLeft: T;
  paddingRight: T;
};

export type SpacingProps<T extends SpacingValue = SpacingValue> =
  MarginProps<T> & PaddingProps<T>;

export type ThemedSpacingProps<
  TSpacing extends AnySpacing,
  TValue extends SpacingValue = SpacingValue
> = {
  [K in keyof SpacingProps<TValue>]:
    | SpacingProps<TValue>[K]
    | SpacingKey<TSpacing>;
};

const expandFullSpacing = <T extends SpacingValue = SpacingValue>(
  value: MultiSpacingValue<T>
): [T, T, T, T] => {
  if (!Array.isArray(value)) {
    return [value, value, value, value];
  }
  if (value.length === 2) {
    return [value[0], value[1], value[0], value[1]];
  }
  return value;
};

export const normalizeMarginStyle = (margin?: Partial<MarginProps>) => {
  const { mx, my } = margin ?? {};
  const m = margin?.m ?? margin?.margin;
  const mt = margin?.mt ?? margin?.marginTop;
  const mr = margin?.mr ?? margin?.marginRight;
  const mb = margin?.mb ?? margin?.marginBottom;
  const ml = margin?.ml ?? margin?.marginLeft;

  const [_mt, _mr, _mb, _ml] = m ? expandFullSpacing(m) : [];

  const styles = {
    marginTop: mt ?? my ?? _mt ?? 0,
    marginBottom: mb ?? my ?? _mb ?? 0,
    marginLeft: ml ?? mx ?? _ml ?? 0,
    marginRight: mr ?? mx ?? _mr ?? 0,
  };

  const marginSingular = [
    styles.marginTop ?? 0,
    styles.marginRight ?? 0,
    styles.marginBottom ?? 0,
    styles.marginLeft ?? 0,
  ]
    .map((x) => (typeof x === "number" ? `${x}px` : x))
    .join(" ");

  return {
    styles: {
      ...styles,
      margin: marginSingular,
    },
    attrs: {
      margin: marginSingular,
    },
  } satisfies NormalizedAttribute;
};

export const normalizePaddingStyle = (padding?: Partial<PaddingProps>) => {
  const { px, py } = padding ?? {};
  const p = padding?.p ?? padding?.padding;
  const pt = padding?.pt ?? padding?.paddingTop;
  const pr = padding?.pr ?? padding?.paddingRight;
  const pb = padding?.pb ?? padding?.paddingBottom;
  const pl = padding?.pl ?? padding?.paddingLeft;

  if (isToken(p)) {
    throw new Error(`Token was not correctly substituted by Brail { m: ${p} }`);
  }

  const [_pt, _pr, _pb, _pl] = p ? expandFullSpacing(p) : [];

  const styles = {
    paddingTop: pt ?? py ?? _pt,
    paddingBottom: pb ?? py ?? _pb,
    paddingLeft: pl ?? px ?? _pl,
    paddingRight: pr ?? px ?? _pr,
  };

  const paddingSingular = [
    styles.paddingTop ?? 0,
    styles.paddingRight ?? 0,
    styles.paddingBottom ?? 0,
    styles.paddingLeft ?? 0,
  ]
    .map((x) => (typeof x === "number" ? `${x}px` : x))
    .join(" ");

  return {
    styles: {
      ...styles,
      padding: paddingSingular,
    },
  } satisfies NormalizedAttribute;
};

/**
 * This is a list of the JSX style props, not the Brail-level props
 */
export const SpacingStyleProps = [
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
] as const;

export const marginStyleToPadding = (
  styles?: ReturnType<typeof normalizeMarginStyle>
): ReturnType<typeof normalizePaddingStyle> => {
  const pStyle = {
    paddingBottom: styles?.styles.marginBottom,
    paddingLeft: styles?.styles.marginLeft,
    paddingRight: styles?.styles.marginRight,
    paddingTop: styles?.styles.marginTop,
  };

  const paddingSingular = [
    pStyle.paddingTop ?? 0,
    pStyle.paddingRight ?? 0,
    pStyle.paddingBottom ?? 0,
    pStyle.paddingLeft ?? 0,
  ]
    .map((x) => (typeof x === "number" ? `${x}px` : x))
    .join(" ");

  return {
    styles: {
      ...pStyle,
      padding: paddingSingular,
    },
  };
};
