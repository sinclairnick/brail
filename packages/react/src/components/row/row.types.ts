import { Expand } from "../../util/types.util";
import {
  AlignValue,
  PercentValue,
  PixelValue,
  SpacingValue,
  UnitlessValue,
  VerticalAlignValue,
  WidthValue,
} from "../../styles";
import { TypographyProviderProps } from "../typography";
import {
  PaddingProps,
  BackgroundColorProps,
  BorderProps,
  BackgroundImageProps,
} from "../../styles";

export type RowProps = Expand<
  {
    children: JSX.Element | JSX.Element[];
    align?: AlignValue;
    verticalAlign?: VerticalAlignValue;
    /**
     * Whether the columns should stack in reverse order
     * @default normal
     */
    stackDirection?: "normal" | "reverse";
    /**
     * Whether the columns should stack on mobile
     * @default true
     */
    stack?: boolean;
  } & Partial<PaddingProps & BackgroundColorProps & BorderProps> &
    TypographyProviderProps
>;

type RowDimensions<T extends WidthValue> = {
  // "Free" width
  remaining: T;
  // Fixed, predefined width
  predefined: T;
  columnDefault: T;
};

export type RowContext = {
  totalWidth: number;
  abs: RowDimensions<number>;
  relative: RowDimensions<PercentValue>;
  stack: boolean;
  getPctWidth: (absWidth: WidthValue) => PercentValue;
  getAbsWidth: (value: WidthValue) => number;
};

export type RowProviderProps = {
  children: RowProps["children"];
} & Pick<RowProps, "stack">;
