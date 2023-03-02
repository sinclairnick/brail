import { ReactNode } from "react";
import { Expand } from "../../util/types.util";
import {
  WidthValue,
  AlignValue,
  VerticalAlignValue,
  HeightValue,
  PaddingProps,
} from "../../styles";
import { TypographyProviderProps } from "../typography";
import { SpacingProps, BackgroundColorProps } from "../../styles";

export type ColumnProps = Expand<
  {
    children: ReactNode;
    width?: WidthValue;
    /**
     *  @warning Avoid this property when using a responsive layout (i.e. fixed !== true)
     */
    height?: HeightValue;
    minWidth?: WidthValue;
    align?: AlignValue;
    verticalAlign?: VerticalAlignValue;
    stackAlign?: AlignValue;
  } & Partial<PaddingProps> &
    Partial<BackgroundColorProps> &
    TypographyProviderProps
>;
