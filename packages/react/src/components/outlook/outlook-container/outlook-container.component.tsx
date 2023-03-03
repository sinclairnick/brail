import { PropsWithChildren } from "react";
import {
  attrObjectToInline,
  styleObjectToInline,
} from "../../../styles/style-prop";
import { MsoConditional } from "../mso-conditional/mso-conditional.component";

export type OutlookContainerProps = PropsWithChildren<{
  styles?: Record<string, unknown>;
  attrs?: Record<string, unknown>;
  width?: number;
}>;

/**
 * Wraps the content in a full table -> tr -> td structure
 * This is required for Outlook to render the content correctly,
 * since it doesn't support such properties on the underlying element
 * @param props
 * @returns
 */
export const OutlookContainer = (props: OutlookContainerProps) => {
  const { attrs, styles } = props;
  const inlineStyles = styleObjectToInline({
    ...styles,
		// Allows e.g. padding to take effect
    borderCollapse: "separate",
  });
  const inlineAttr = attrObjectToInline(attrs);

  const startMso = [
    "<table",
    'role="presentation"',
    'cellspacing="0"',
    'cellpadding="0"',
    props.width ? `width="${props.width}"` : "",
    'border="0">',
    "<tr>",
    `<td ${inlineAttr} style="${inlineStyles}">`,
  ];

  const endMso = ["</td>", "</tr>", "</table>"];

  return (
    // NOTE: Joining with spaces works while joining with newlines breaks outlook
    <MsoConditional startMso={startMso.join(" ")} endMso={endMso.join(" ")}>
      {props.children}
    </MsoConditional>
  );
};
