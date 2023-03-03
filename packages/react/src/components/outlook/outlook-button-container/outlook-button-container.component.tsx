import { PropsWithChildren } from "react";
import { styleObjectToInline } from "../../../styles/style-prop";
import { ButtonProps } from "../../button";
import { MsoConditional } from "../mso-conditional/mso-conditional.component";

export type OutlookButtonContainerProps = PropsWithChildren<{
  url: string;
  fontStyles: Record<string, unknown>;
}> &
  Pick<ButtonProps, "borderColor" | "border" | "backgroundColor">;

/** TODO: Get this working properly */
export const OutlookButtonContainer = (props: OutlookButtonContainerProps) => {
  const inlineFontStyles = styleObjectToInline(props.fontStyles);

  return (
    <MsoConditional
      startMso={[
        `<v:roundrect`,
        `href="${props.url}"`,
        `style="height: 48px; width:200px; v-text-anchor:middle;"`,
        `arcsize="${"10%"}"`,
        `stroke="${props.borderColor ?? "f"}"`,
        `fillcolor="${props.backgroundColor ?? ""}"`,
        `xmlns:v="urn:schemas-microsoft-com:vml"`,
        `xmlns:w="urn:schemas-microsoft-com:office:word">`,
        `<w:anchorlock/>`,
        `<v:textbox style="mso-fit-shape-to-text:true; ${inlineFontStyles}" inset="0,0,0,0">`,
        `<center>`,
      ].join(" ")}
      endMso={[`</center>`, `</v:textbox>`, `</v:roundrect>`].join(" ")}
    >
      {props.children}
    </MsoConditional>
  );
};
