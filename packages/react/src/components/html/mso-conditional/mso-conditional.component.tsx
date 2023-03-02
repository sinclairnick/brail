import { PropsWithChildren } from "react";
import {
  BackgroundImageProps,
  HeightValue,
  normalizeBackgroundImage,
  WidthValue,
} from "../../../styles";
import { HtmlComment } from "../html-comment/html-comment.component";

export type MsoConditionalProps = PropsWithChildren<{
  startMso: string;
  endMso: string;
}>;

export const MsoConditional = (props: MsoConditionalProps) => {
  const { endMso, startMso, children } = props;

  return (
    <>
      <HtmlComment text={`<!--[if mso]>${startMso}<![endif]-->`} />
      {children}
      <HtmlComment text={`<!--[if mso]>${endMso}<![endif]-->`} />
    </>
  );
};

export const GteMso9Conditional = (props: MsoConditionalProps) => {
  const { endMso, startMso, children } = props;

  return (
    <>
      <HtmlComment text={`<!--[if gte mso 9]>${startMso}<![endif]-->`} />
      {children}
      <HtmlComment text={`<!--[if gte mso 9]>${endMso}<![endif]-->`} />
    </>
  );
};

export const MsoBackgroundImage = (
  props: PropsWithChildren<
    ReturnType<typeof normalizeBackgroundImage> & {
      width: WidthValue;
      height: HeightValue;
    }
  >
) => {
  const { height, width, children, styles } = props;

  return (
    <GteMso9Conditional
      startMso={
        `<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${width}; height:${height}; background-position: ${
          styles?.backgroundPosition ?? "center center"
        } !important;">\n` +
        `<v:fill type="tile" src="${styles?.backgroundImage?.replace(
          /url\("(.*)"\)/,
          "$1"
        )}" color="#117FF1"/>\n` +
        `<v:textbox inset="0,0,0,0">\n`
      }
      endMso={`</v:textbox>\n` + `</v:rect>\n`}
    >
      {children}
    </GteMso9Conditional>
  );
};
