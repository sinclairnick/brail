import {
  normalizeMarginStyle,
  normalizePaddingStyle,
  ensureAbsoluteUrl,
  normalizeBorder,
  normalizeShadow,
} from "../../styles";
import { useParentDimensions } from "../../util/parent-provider";
import { useEmailContext } from "../email/email.constants";
import { ImageProps } from "./image.types";

export const Image = (props: ImageProps) => {
  const { height, alt, src } = props;
  const parentCtx = useParentDimensions();
  const emailCtx = useEmailContext();
  const margin = normalizeMarginStyle(props);
  const padding = normalizePaddingStyle(props);
  const width =
    props.width ?? props.maxWidth ?? parentCtx.width ?? emailCtx.maxWidth;
  const maxWidth = props.maxWidth ?? props.width ?? "100%";
  const absoluteUrl = ensureAbsoluteUrl(
    emailCtx.baseUrl,
    src,
    props.skipValidation
  );
  const border = normalizeBorder(props);
  const shadow = normalizeShadow(props);

  return (
    <img
      src={absoluteUrl}
      alt={alt}
      height={height}
      width={width}
      style={{
        margin: "auto",
        display: "block",
        maxWidth,
        width: "100%",
        ...margin.styles,
        ...padding.styles,
        ...border.styles,
        ...shadow.styles,
      }}
    />
  );
};
