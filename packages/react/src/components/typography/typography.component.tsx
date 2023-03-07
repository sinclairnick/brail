import {
  normalizeMarginStyle,
  normalizePaddingStyle,
  normalizeFont,
  normalizeColor,
} from "../../styles";
import { useTypographyContext } from "./typography.constants";
import { TypographyProps } from "./typography.types";
import { OutlookContainer } from "../outlook/outlook-container/outlook-container.component";

export const Typography = (props: TypographyProps) => {
  const { inline = false, as: _as, children } = props;
  const typoCtx = useTypographyContext();
  const Tag = _as ?? "p";
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

  const style = {
    ...margin.styles,
    ...padding.styles,
    ...font.styles,
    ...color.styles,
  };

  const attrs = {
    ...color.attrs,
    ...margin.attrs,
  };

  return (
    <OutlookContainer
      styles={{
        ...style,
        align: font.styles?.textAlign, // Force table alignment to match the text alignment
      }}
      attrs={attrs}
    >
      <Tag
        {...attrs}
        style={{
          // Outlook has limited support for inline-block, so we use inline instead
          // Ref: https://www.campaignmonitor.com/css/positioning-display/display/
          display: inline ? "inline" : "block",
          width: "100%",
          ...style,
        }}
      >
        {children}
      </Tag>
    </OutlookContainer>
  );
};
