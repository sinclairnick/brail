import { NormalizedAttribute } from "../../util/normalize-attributes";
import { AnyFont, FontKey } from "../theme/theme.types";
import {
  AlignValue,
  FontSizeValue,
  FontWeight,
  LineHeightValue,
} from "./units";

export type ThemedFontProps<TFont extends AnyFont> = {
  fontFamily?: (string & {}) | FontKey<TFont>;
} & Omit<FontProps, "fontFamily">;

export type FontProps = {
  fontFamily: string;
  fontSize: FontSizeValue;
  fontWeight: FontWeight;
  textAlign: AlignValue;
  lineHeight: LineHeightValue;
  textDecoration: string;
};

export const normalizeFont = (props?: Partial<FontProps>) => {
  if (!props) return {} satisfies NormalizedAttribute;

  // Coerce unitless into px
  const lineHeight =
    typeof props.lineHeight === "number"
      ? `${props.lineHeight}px`
      : props.lineHeight;

  return {
    styles: {
      lineHeight,
      fontFamily: props.fontFamily,
      fontSize: props.fontSize,
      textAlign: props.textAlign,
      textDecoration: props.textDecoration,
      fontWeight: props.fontWeight,
    },
  } satisfies NormalizedAttribute;
};
