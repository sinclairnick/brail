import { NormalizedAttribute } from "../../util/normalize-attributes";
import {
  AnyShadow,
  AnySpacing,
  ShadowKey,
  SpacingKey,
} from "../theme/theme.types";
import { PercentValue, PixelValue, UnitlessValue } from "./units";

export type ThemedBorderProps<TSpacing extends AnySpacing = AnySpacing> =
  Omit<BorderProps, "borderWidth" | "borderRadius"> & {
    borderWidth: UnitlessValue | PixelValue | SpacingKey<TSpacing>;
    borderRadius:
      | UnitlessValue
      | PixelValue
      | PercentValue
      | SpacingKey<TSpacing>;
  };

/**
 * Intentionally omitted `border[Vertical][Horizontal]Radius` properties
 */
export type BorderProps = {
  border: string;
  borderColor: string;
  borderWidth: UnitlessValue | PixelValue;
  borderStyle:
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "hidden"
    | "inset"
    | "none"
    | "outset"
    | "ridge"
    | "solid";
  borderRadius: UnitlessValue | PixelValue | PercentValue;
  borderTop: string;
  borderBottom: string;
  borderLeft: string;
  borderRight: string;
};

export type ThemedShadowProps<TShadow extends AnyShadow> = {
  boxShadow: (string & {}) | ShadowKey<TShadow>;
};

export type ShadowProps = {
  boxShadow: string;
};

export const normalizeBorder = (props?: Partial<BorderProps>) => {
  if (!props) return {} satisfies NormalizedAttribute;

  let border = "";
  if (props.borderWidth) border += `${props.borderWidth}`;
  if (props.borderColor) border += ` ${props.borderColor}`;
  if (props.borderStyle) border += ` ${props.borderStyle}`;

  return {
    attrs: { border },
    styles: {
      border: props.border,
      borderRadius: props.borderRadius,
      borderTop: props.borderTop,
      borderBottom: props.borderBottom,
      borderLeft: props.borderLeft,
      borderRight: props.borderRight,
    },
  } satisfies NormalizedAttribute;
};

export const normalizeShadow = (props?: Partial<ShadowProps>) => {
  if (!props) return {} satisfies NormalizedAttribute;

  return {
    styles: { boxShadow: props.boxShadow as string },
  } satisfies NormalizedAttribute;
};
