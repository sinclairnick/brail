import { PropsWithChildren } from "react";
import { SpacingProps, FontProps, ColorProps } from "../../styles";
import { Expand } from "../../util/types.util";

export type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export type TypographyProps = Expand<
  PropsWithChildren<{
    as?: TypographyElement;
    inline?: boolean;
  }> &
    Partial<SpacingProps & FontProps & ColorProps>
>;

export type TypographyContext = Partial<FontProps & ColorProps>;

export type TypographyProviderProps = Expand<TypographyContext>;
