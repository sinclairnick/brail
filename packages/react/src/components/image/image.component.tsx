import {
  normalizeMarginStyle,
  normalizePaddingStyle,
  ensureAbsoluteUrl,
  normalizeBorder,
  normalizeShadow,
  getAxisSpacing,
  getPxValue,
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

  const maxWidth = props.maxWidth ?? props.width ?? "100%";
  const absoluteUrl = ensureAbsoluteUrl(
    emailCtx.baseUrl,
    src,
    props.skipValidation
  );
  const border = normalizeBorder(props);
  const shadow = normalizeShadow(props);

  const axis = getAxisSpacing({
    margin,
    padding,
  });

  let width =
    props.width ?? props.maxWidth ?? parentCtx.width ?? emailCtx.maxWidth;
  width = getPxValue(width) ?? 0;

  // Shouldn't be zero in practice
  if (width === 0) throw new Error("Image width is 0");

  width = Math.min(width, parentCtx.width);
  width = width - axis.left - axis.right;

  return (
    <img
      src={absoluteUrl}
      alt={alt}
      height={height}
      width={width}
      style={{
        display: "block",
        maxWidth,
        width: "100%",
        height: "auto",
        ...margin.styles,
        ...padding.styles,
        ...border.styles,
        ...shadow.styles,
      }}
    />
  );
};
