import React, { ReactNode } from "react";
import {
  SpacingProps,
  ColorProps,
  BackgroundColorProps,
  FontProps,
  BorderProps,
} from "../../styles";

export type LinkProps = {
  href: string;
  children: ReactNode;
  rel?: string | null;
  target?: React.HTMLAttributeAnchorTarget | null;
  skipValidation?: boolean;
  inline?: boolean;
} & Partial<SpacingProps> &
  Partial<ColorProps> &
  Partial<BackgroundColorProps> &
  Partial<FontProps> &
  Partial<BorderProps>;
