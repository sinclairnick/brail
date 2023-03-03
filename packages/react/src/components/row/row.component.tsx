import {
  normalizeVerticalAlign,
  normalizeAlign,
  normalizePaddingStyle,
  normalizeBackgroundColor,
  normalizeBorder,
  normalizeBackgroundImage,
} from "../../styles";
import {
  ParentDimensionProvider,
  useParentDimensions,
} from "../../util/parent-provider";
import { MsoConditional } from "../outlook/mso-conditional/mso-conditional.component";
import { Table } from "../table/table.component";
import { TypographyProvider } from "../typography/typography.constants";
import { RowProvider } from "./row.constants";
import { RowProps } from "./row.types";

export const Row = (props: RowProps) => {
  const parentCtx = useParentDimensions();
  const { stackDirection = "normal" } = props;

  const vAlign = normalizeVerticalAlign(props.verticalAlign);
  const align = normalizeAlign(props.align);
  const padding = normalizePaddingStyle(props);
  const bg = normalizeBackgroundColor(props);
  const border = normalizeBorder(props);

  const maxWidth = parentCtx.width;
  const bgImage = normalizeBackgroundImage(props);

  const commonAttrs = { ...vAlign.attrs, ...align.attrs, ...bg.attrs };
  const commonStyles = { ...vAlign.styles, ...align.styles, ...bg.styles };

  let children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  children = stackDirection === "reverse" ? [...children].reverse() : children;

  return (
    <Table
      {...commonAttrs}
      style={{ maxWidth, width: "100%", ...commonStyles, ...bgImage.styles }}
    >
      <tbody>
        <tr {...border.attrs} style={{ ...border.styles }}>
          <td {...commonAttrs} style={{ ...commonStyles, ...padding.styles }}>
            <div
              {...commonAttrs}
              dir={stackDirection === "normal" ? "ltr" : "rtl"}
              style={{ width: "100%", ...commonStyles }}
            >
              <MsoConditional
                startMso={`<table role="presentation" border="0" cellspacing="0" cellpadding="0" width="640"> <tr>`}
                endMso={`</tr> </table>`}
              >
                <ParentDimensionProvider
                  name="Row"
                  width={maxWidth}
                  padding={padding}
                >
                  <TypographyProvider {...props}>
                    {/* Keep Row provider below ParentDimProvider */}
                    <RowProvider stack={props.stack}>{children}</RowProvider>
                  </TypographyProvider>
                </ParentDimensionProvider>
              </MsoConditional>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
