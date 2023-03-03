import {
  SpacingProps,
  ColorProps,
  BackgroundColorProps,
  FontProps,
  BorderProps,
  ShadowProps,
  UnitlessValue,
  PixelValue,
} from "../../styles";
import { Expand } from "../../util/types.util";

type BaseProps = {
  href: string;
  children: React.ReactNode;
  rel?: string | null;
  target?: React.HTMLAttributeAnchorTarget | null;
};

export type ButtonProps = Expand<
  BaseProps &
    Partial<
      SpacingProps<UnitlessValue | PixelValue> &
        ColorProps &
        BackgroundColorProps &
        FontProps &
        BorderProps &
        ShadowProps
    >
>;
