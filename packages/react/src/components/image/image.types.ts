import { Expand } from "../../util/types.util";
import {
  PercentValue,
  PixelValue,
  UnitlessValue,
} from "../../styles";
import { SpacingProps, ShadowProps, BorderProps } from "../../styles";

export type ImageProps = Expand<
  {
    src: string;
    /** Requires absolute height. */
    height?: number;
    /**
     *  Requires absolute width.
     * 	@default full-width.
     */
    width?: UnitlessValue | PixelValue;
    maxWidth?: UnitlessValue | PixelValue;
    alt?: string;
    skipValidation?: boolean;
  } & Partial<SpacingProps> &
    Partial<ShadowProps> &
    Partial<BorderProps>
>;
