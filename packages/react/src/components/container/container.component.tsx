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
import { OutlookBgContainer } from "../outlook/outlook-bg-container/outlook-bg-container.component";
import { OutlookContainer } from "../outlook/outlook-container/outlook-container.component";
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

  const style = {
    maxWidth,
    ...padding.styles,
    // Place bg styles before bg image
    ...bg.styles,
    ...border.styles,
    ...shadow.styles,
    ...margin.styles,
    ...bgImage.styles,
  };

  const attr = {
    ...bg.attrs,
    ...bgImage.attrs,
    ...border.styles,
    ...margin.attrs,
  };

  return (
    <OutlookContainer styles={style} attrs={attr} width={ctx.maxWidth}>
      <OutlookBgContainer
        backgroundColor={props.backgroundColor}
        backgroundImage={bgImage.attrs?.background}
        width={ctx.maxWidth}
      >
        <div {...attr} style={style}>
          <ParentDimensionProvider
            name="Container"
            width={ctx.maxWidth}
            padding={padding}
            margin={margin}
          >
            <TypographyProvider {...props}>{props.children}</TypographyProvider>
          </ParentDimensionProvider>
        </div>
      </OutlookBgContainer>
    </OutlookContainer>
  );
};
