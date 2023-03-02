import {
  normalizeMarginStyle,
  normalizePaddingStyle,
  normalizeFont,
  normalizeColor,
} from "../../styles";
import { useTypgraphyContext } from "./typography.constants";
import { TypographyProps } from "./typography.types";

export const Typography = (props: TypographyProps) => {
  const { inline = false, variant, children } = props;
  const typoCtx = useTypgraphyContext();
  const Tag = variant ?? "p";
  const margin = normalizeMarginStyle(props);
  const padding = normalizePaddingStyle(props);

  const fontSize = props.fontSize ?? typoCtx.fontSize;
  const fontFamily = props.fontFamily ?? typoCtx.fontFamily;
  const fontWeight = props.fontWeight ?? typoCtx.fontWeight;
  const lineHeight = props.lineHeight ?? typoCtx.lineHeight;
  const textAlign = props.textAlign ?? typoCtx.textAlign;
  const textDecoration = props.textDecoration ?? typoCtx.textDecoration;

  const font = normalizeFont({
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    textAlign,
    textDecoration,
  });

  const color = normalizeColor({ color: props.color ?? typoCtx.color });

  return (
    <Tag
      {...color.attrs}
      {...margin.attrs}
      style={{
        display: inline ? "inline-block" : "block",
        ...margin.styles,
        ...padding.styles,
        ...font.styles,
        ...color.styles,
      }}
    >
      {children}
    </Tag>
  );
};
