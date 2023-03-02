import { NormalizedAttribute } from "../../util/normalize-attributes";
import { AlignValue, VerticalAlignValue } from "./units";

export const normalizeVerticalAlign = (verticalAlign?: VerticalAlignValue) => {
  return {
    attrs: { valign: verticalAlign },
    styles: { verticalAlign },
  } satisfies NormalizedAttribute;
};

export const normalizeAlign = (align?: AlignValue) => {
  return {
    attrs: { align },
    styles: { textAlign: align },
  } satisfies NormalizedAttribute;
};
