import {
  BorderProps,
  BackgroundColorProps,
  PaddingProps,
  ShadowProps,
  SpacingProps,
  BackgroundImageProps,
} from "../../styles";
import { Expand } from "../../util/types.util";
import { TypographyProviderProps } from "../typography";

export type ContainerProps = Expand<
  {
    children: React.ReactNode;
  } & Partial<
    BorderProps &
      BackgroundColorProps &
      SpacingProps &
      ShadowProps &
      BackgroundImageProps
  > &
    TypographyProviderProps
>;
