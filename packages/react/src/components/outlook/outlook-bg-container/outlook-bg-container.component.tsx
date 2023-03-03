import { PropsWithChildren } from "react";
import { AlignValue } from "../../../styles";
import { styleObjectToInline } from "../../../styles/style-prop";
import { MsoConditional } from "../mso-conditional/mso-conditional.component";

export type OutlookBgContainer = PropsWithChildren<{
  backgroundImage?: string;
  backgroundColor?: string;
  width?: number;
  align?: AlignValue;
}>;

type VTextAnchor =
  | "top"
  | "middle"
  | "bottom"
  | "top-center"
  | "middle-center"
  | "bottom-center"
  | "top-baseline"
  | "bottom-baseline"
  | "top-center-baseline"
  | "bottom-center-baseline";

export const OutlookBgContainer = (props: OutlookBgContainer) => {
  const { backgroundColor, backgroundImage } = props;

  if (backgroundImage == null) {
    return <>{props.children}</>;
  }

  const startMso: string[] = [];
  const endMso: string[] = [];

  const style = {
    width: props.width,
    backgroundPosition: "center center !important",
  };
  const inlineStyle = styleObjectToInline(style);

  // Add v:rect stuff for outlook background support
  if (props.backgroundImage) {
    startMso.push(
      ...[
        `<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="${inlineStyle}">`,
        `<v:fill type="frame" src="${backgroundImage}" color="${
          backgroundColor ?? ""
        }" />`,
        `<v:textbox style="mso-fit-text-to-shape: true; v-text-anchor: middle-center;" inset="0,0,0,0">`,
      ]
    );
    endMso.unshift(...[`</v:textbox>`, `</v:rect>`]);
  }

  return (
    <MsoConditional startMso={startMso.join(" ")} endMso={endMso.join(" ")}>
      {props.children}
    </MsoConditional>
  );
};
