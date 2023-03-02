import { NormalizedAttribute } from "../../util/normalize-attributes";
import { normalizeMarginStyle, normalizePaddingStyle } from "./spacing";
import { WidthValue, HeightValue } from "./units";

export const normalizeWidth = (args: {
  width?: WidthValue;
  minWidth?: WidthValue;
}) => {
  const { minWidth, width } = args;

  return {
    attrs: {
      width: "100%",
    },
    styles: {
      width: "100%",
      maxWidth: width,
    },
  } satisfies NormalizedAttribute;
};

export const normalizeHeight = (height?: HeightValue) => {
  return {
    attrs: { height },
    styles: { height },
  } satisfies NormalizedAttribute;
};

export const getPxValue = (
  amount: number | string | undefined,
  parentWidth?: number
): number | undefined => {
  if (amount === undefined) return;

  // Parse number values
  if (typeof amount === "number") return amount;
  const asNumber = Number(amount);
  if (asNumber.toString() === amount) return asNumber;

  // Parse px values
  if (amount.endsWith("px")) {
    const numPart = amount.slice(0, -2);
    return getPxValue(numPart);
  }

  // Parse % values
  if (amount.endsWith("%") && parentWidth != null) {
    const numPart = amount.slice(0, -1);
    const asNumber = Number(numPart);
    if (asNumber.toString() === numPart) {
      return (asNumber / 100) * parentWidth;
    }
  }

  return;
};

export const getAxisSpacing = (args: {
  margin?: ReturnType<typeof normalizeMarginStyle>;
  padding?: ReturnType<typeof normalizePaddingStyle>;
}) => {
  const { margin, padding } = args;

  const ml = getPxValue(margin?.styles.marginLeft) ?? 0;
  const mr = getPxValue(margin?.styles.marginRight) ?? 0;
  const pl = getPxValue(padding?.styles.paddingLeft) ?? 0;
  const pr = getPxValue(padding?.styles.paddingRight) ?? 0;

  return { left: pl + ml, right: pr + mr, padding: pr + pl, margin: mr + ml };
};

/** Make absolute width adjusted by margin and padding values */
export const adjustAbsoluteWidth = (args: {
  width?: WidthValue;
  margin?: ReturnType<typeof normalizeMarginStyle>;
  padding?: ReturnType<typeof normalizePaddingStyle>;
}): number | undefined => {
  const { width, margin, padding } = args;

  const widthAsNum = getPxValue(width);
  if (widthAsNum == null) return;

  const axisSpacing = getAxisSpacing({ margin, padding });

  return widthAsNum - (axisSpacing.left + axisSpacing.right);
};

export const isPercentageWidth = (width: WidthValue | undefined) => {
  return width != null && typeof width === "string" && width.endsWith("%");
};

export const slugifyWidth = (width: WidthValue | undefined) => {
  if (width == null) return;

  return width.toString().replace(/[^a-zA-Z0-9]/g, "-");
};

export const getPctWidthStyles = (width: WidthValue | undefined) => {
  if (!isPercentageWidth(width)) return;

  const pctClassName = `column-${slugifyWidth(width)}-percent`;

  // Overwrites the width and max-width of the responsive container
  // when using percentage values
  const pctStyles =
    `.${pctClassName}` +
    ` { width: ${width} !important; max-width: ${width} !important; }`;

  return { css: pctStyles, className: pctClassName };
};
