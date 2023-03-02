import {
  SpacingProps,
  ColorProps,
  BackgroundColorProps,
  FontProps,
  BorderProps,
  ShadowProps,
} from "../../styles";
import { Expand } from "../../util/types.util";

type BaseProps = {
  href: string;
  children: React.ReactNode;
  rel?: string | null;
  target?: React.HTMLAttributeAnchorTarget | null;
  display?: "block" | "inline-block";
};

export type ButtonProps = Expand<
  BaseProps &
    Partial<
      SpacingProps &
        ColorProps &
        BackgroundColorProps &
        FontProps &
        BorderProps &
        ShadowProps
    >
>;
