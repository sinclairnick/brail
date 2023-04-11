export type UnitlessValue = number | `${number}`;
export type PixelValue = `${number}px`;
export type PercentValue = `${number}%`;
export type EmValue = `${number}em`;
export type RemValue = `${number}rem`;
export type VhValue = `${number}vh`;
export type VwValue = `${number}vw`;
export type VminValue = `${number}vmin`;
export type VmaxValue = `${number}vmax`;
export type PtValue = `${number}pt`;
export type AutoValue = "auto";

export type NumericValue =
  | UnitlessValue
  | PixelValue
  | PercentValue
  | EmValue
  | RemValue
  | VhValue
  | VwValue
  | VminValue
  | VmaxValue
  | AutoValue;

// SPACING
/**
 *  Only absolute values are allowed, to enable imitating border-box-like
 * functionality without the use of calc(), which has limited support.
 */
export type SpacingValue = UnitlessValue | PixelValue;

// NOTE: Not using this to reserve array syntax for responsive styling
export type MultiSpacingValue<T extends NumericValue = NumericValue> =
  | T
  | [T, T]
  | [T, T, T, T];

export type AlignValue = "center" | "left" | "right";
export type VerticalAlignValue = "top" | "middle" | "bottom";

// LAYOUT
export type WidthValue = UnitlessValue | PixelValue | PercentValue | AutoValue;
export type HeightValue = UnitlessValue | PixelValue;

// COLOR
export type BackgroundColorValue = string & {};
export type ColorValue = string & {};

// FONT
export type FontSizeValue = UnitlessValue | PixelValue | EmValue | PtValue;
export type LineHeightValue =
  | UnitlessValue
  | PixelValue
  | EmValue
  | PercentValue;

type FontWeightNumerical = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type FontWeight =
  | "normal"
  | "bold"
  | "bolder"
  | "lighter"
  | FontWeightNumerical
  | `${FontWeightNumerical}`;

export type BackgroundPositionNumeric =
  | `${number}%`
  | `${number}px`
  | `${number}em`;

export type BackgroundPositionOrientation =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center";

export type BackgroundPositionOrienationWithNumeric =
  `${BackgroundPositionOrientation} ${BackgroundPositionNumeric}`;

export type BackgroundPositionOrientationWithoutNumeric =
  `${BackgroundPositionOrientation}`;

export type BackgroundPositionValue =
  | `${BackgroundPositionNumeric} ${BackgroundPositionNumeric}`
  | BackgroundPositionOrienationWithNumeric
  | BackgroundPositionOrientationWithoutNumeric
  | `${
      | BackgroundPositionOrienationWithNumeric
      | BackgroundPositionOrientationWithoutNumeric} ${
      | BackgroundPositionOrienationWithNumeric
      | BackgroundPositionOrientationWithoutNumeric}`;

export type BackgroundSizeValue = "cover" | "contain" | "auto" | "100%";
