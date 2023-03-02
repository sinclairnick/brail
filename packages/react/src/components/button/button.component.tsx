import {
  normalizePaddingStyle,
  normalizeMarginStyle,
  normalizeBackgroundColor,
  normalizeColor,
  normalizeBorder,
  normalizeFont,
  normalizeShadow,
} from "../../styles";
import { useTypgraphyContext } from "../typography/typography.constants";
import { ButtonProps } from "./button.types";

export const Button = (props: ButtonProps) => {
  const { href, display = "inline-block" } = props;
  const typoCtx = useTypgraphyContext();
  const padding = normalizePaddingStyle(props);
  const margin = normalizeMarginStyle(props);
  const bg = normalizeBackgroundColor(props);
  const border = normalizeBorder(props);
  const shadow = normalizeShadow(props);

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
    <span style={{ display: "block", ...margin.styles }}>
      <a
        {...color.attrs}
        {...border.attrs}
        rel="nofollow noopener noreferrer"
        target="_blank"
        href={href}
        style={{
          display,
          ...padding.styles,
          ...color.styles,
          ...bg.styles,
          ...border.styles,
          ...font.styles,
          ...shadow.styles,
        }}
      >
        {props.children}
      </a>
    </span>
  );
};
