import { Style } from "..";
import {
  getPctWidthStyles,
  getPxValue,
  normalizeAlign,
  normalizeBackgroundColor,
  normalizeHeight,
  normalizeMarginStyle,
  normalizePaddingStyle,
  normalizeVerticalAlign,
  normalizeWidth,
} from "../../styles";
import { ParentDimensionProvider } from "../../util/parent-provider";
import { useEmailContext } from "../email/email.constants";
import { MsoConditional } from "../outlook/mso-conditional/mso-conditional.component";
import { useRowContext } from "../row/row.constants";
import { Table } from "../table/table.component";
import { TypographyProvider } from "../typography/typography.constants";
import { ColumnProps } from "./column.types";

const C_RESPONSIVE_BASE = "responsive-container";

const C_FULL_WIDTH_CONTAINER = "column-100-percent";

export const Column = (props: ColumnProps) => {
  const { stackAlign = "center" } = props;
  const emailCtx = useEmailContext();
  const rowCtx = useRowContext();

  const bg = normalizeBackgroundColor(props);
  const height = normalizeHeight(props.height);
  const padding = normalizePaddingStyle(props);
  const align = normalizeAlign(props.align ?? "left");
  const vAlign = normalizeVerticalAlign(props.verticalAlign ?? "middle");

  const minWidth = props.minWidth ?? props.width ?? emailCtx.minWidth;

  // When stack=false, use percentage values
  const rowCtxColWidth = rowCtx.stack
    ? rowCtx.abs.columnDefault
    : rowCtx.relative.columnDefault;

  const width = props.width ?? rowCtxColWidth;

  const absWidth = getPxValue(width, rowCtx.totalWidth);

  const respWidth = normalizeWidth({
    minWidth,
    width,
  });

  const pctStyle = getPctWidthStyles(rowCtx.getPctWidth(width));
  const classes = [C_RESPONSIVE_BASE];
  if (rowCtx.stack) {
    classes.push(C_FULL_WIDTH_CONTAINER);
  } else if (pctStyle?.className) {
    classes.push(pctStyle?.className);
  }

  return (
    <>
      <Style>{`
			@media screen and (max-width: ${emailCtx.maxWidth}px) {
			.${C_RESPONSIVE_BASE} {
				direction: ltr !important;
				text-align: ${stackAlign} !important;
				margin: 0 auto !important;
			}
			.${C_FULL_WIDTH_CONTAINER} {
				display: block !important;
				width: 100% !important;
				max-width: 100% !important;
			}
		}
		`}</Style>
      {pctStyle?.css && <Style>{pctStyle.css}</Style>}
      <MsoConditional
        startMso={
          `<td align="${align.attrs.align}" ` +
          `valign="${vAlign.attrs.valign}" ` +
          `width="${absWidth}" ` +
          `${props.height ? `height="${props.height}"` : ""}` +
          `>`
        }
        endMso={`</td>`}
      >
        <div
          {...respWidth.attrs}
          {...height.attrs}
          className={classes.join(" ")}
          dir="ltr"
          style={{
            display: "inline-block",
            ...align.styles,
            ...vAlign.styles,
            ...respWidth.styles,
            ...height.styles,
            ...bg.styles,
          }}
        >
          <Table width="100%">
            <tbody>
              <tr>
                <td
                  {...bg.attrs}
                  {...align.attrs}
                  {...vAlign.attrs}
                  style={{
                    ...bg.styles,
                    ...padding.styles,
                  }}
                >
                  <ParentDimensionProvider width={absWidth} padding={padding}>
                    <TypographyProvider {...props}>
                      {props.children}
                    </TypographyProvider>
                  </ParentDimensionProvider>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </MsoConditional>
    </>
  );
};
