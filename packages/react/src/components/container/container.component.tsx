import {
  normalizePaddingStyle,
  normalizeBackgroundColor,
  normalizeBorder,
  normalizeShadow,
  adjustAbsoluteWidth,
  normalizeMarginStyle,
  normalizeBackgroundImage,
} from "../../styles";
import { ParentDimensionProvider } from "../../util/parent-provider";
import { useEmailContext } from "../email/email.constants";
import { MsoConditional } from "../html/mso-conditional/mso-conditional.component";
import { TypographyProvider } from "../typography/typography.constants";
import { ContainerProps } from "./container.types";

export const Container = (props: ContainerProps) => {
  const ctx = useEmailContext();
  const padding = normalizePaddingStyle(props);
  const margin = normalizeMarginStyle(props);
  const bg = normalizeBackgroundColor(props);
  const border = normalizeBorder(props);
  const shadow = normalizeShadow(props);
  const bgImage = normalizeBackgroundImage(props, ctx.baseUrl);

  const maxWidth = adjustAbsoluteWidth({
    width: ctx.maxWidth,
    margin,
    padding,
  });

  return (
    <MsoConditional
      startMso={`<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="${ctx.maxWidth}" align="center"> <tr> <td>`}
      endMso={`</td> </tr> </table>`}
    >
      <div
        style={{
          maxWidth,
          ...padding.styles,
          ...bg.styles,
          ...border.styles,
          ...shadow.styles,
          ...margin.styles,
          ...bgImage.styles,
        }}
      >
        <ParentDimensionProvider
          name="Container"
          width={ctx.maxWidth}
          padding={padding}
          margin={margin}
        >
          <TypographyProvider {...props}>{props.children}</TypographyProvider>
        </ParentDimensionProvider>
      </div>
    </MsoConditional>
  );
};
