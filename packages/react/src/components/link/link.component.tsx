import {
  normalizePaddingStyle,
  normalizeMarginStyle,
  normalizeBackgroundColor,
  normalizeColor,
  normalizeBorder,
  normalizeFont,
  ensureAbsoluteUrl,
} from "../../styles";
import { useEmailContext } from "../email/email.constants";
import { useTypgraphyContext } from "../typography/typography.constants";
import { LinkProps } from "./link.types";

export const Link = (props: LinkProps) => {
  const {
    href,
    target = "_blank",
    rel = "nofollow noreferrer noopener",
    inline = false,
  } = props;
  const emailCtx = useEmailContext();
  const typoCtx = useTypgraphyContext();
  const padding = normalizePaddingStyle(props);
  const margin = normalizeMarginStyle(props);
  const bg = normalizeBackgroundColor(props);
  const border = normalizeBorder(props);

  const absoluteUrl = ensureAbsoluteUrl(
    emailCtx.baseUrl,
    href,
    props.skipValidation
  );

  const color = normalizeColor({ color: props.color ?? typoCtx.color });
  const font = normalizeFont({
    fontFamily: props.fontFamily ?? typoCtx.fontFamily,
    fontSize: props.fontSize ?? typoCtx.fontSize,
    fontWeight: props.fontWeight ?? typoCtx.fontWeight,
    lineHeight: props.lineHeight ?? typoCtx.lineHeight,
    textAlign: props.textAlign ?? typoCtx.textAlign,
    textDecoration: props.textDecoration ?? typoCtx.textDecoration,
  });

  return (
    <a
      {...color.attrs}
      {...border.attrs}
      rel={rel ?? undefined}
      target={target ?? undefined}
      href={absoluteUrl}
      style={{
        display: inline ? "inline-block" : "block",
        ...margin.styles,
        ...padding.styles,
        ...color.styles,
        ...bg.styles,
        ...border.styles,
        ...font.styles,
      }}
    >
      {props.children}
    </a>
  );
};
