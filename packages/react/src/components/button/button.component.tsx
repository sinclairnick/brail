import {
  normalizePaddingStyle,
  normalizeMarginStyle,
  normalizeBackgroundColor,
  normalizeColor,
  normalizeBorder,
  normalizeFont,
  normalizeShadow,
  ensureAbsoluteUrl,
  marginStyleToPadding,
  getPxValue,
} from "../../styles";
import { useEmailContext } from "../email/email.constants";
import { MsoConditional } from "../outlook/mso-conditional/mso-conditional.component";
import { useTypographyContext } from "../typography/typography.constants";
import { ButtonProps } from "./button.types";

export const Button = (props: ButtonProps) => {
  const { href } = props;
  const emailCtx = useEmailContext();
  const typoCtx = useTypographyContext();
  const padding = normalizePaddingStyle(props);
  const margin = normalizeMarginStyle(props);
  const bg = normalizeBackgroundColor(props);
  const border = normalizeBorder(props);
  const shadow = normalizeShadow(props);
  const url = ensureAbsoluteUrl(emailCtx.baseUrl, href);

  const color = normalizeColor({ color: props.color ?? typoCtx.color });

  const font = normalizeFont({
    fontFamily: props.fontFamily ?? typoCtx.fontFamily,
    fontSize: props.fontSize ?? typoCtx.fontSize,
    fontWeight: props.fontWeight ?? typoCtx.fontWeight,
    lineHeight: props.lineHeight ?? typoCtx.lineHeight,
    textAlign: props.textAlign ?? typoCtx.textAlign,
    textDecoration: props.textDecoration ?? typoCtx.textDecoration,
  });

  const style = {
    ...padding.styles,
    ...color.styles,
    ...bg.styles,
    ...border.styles,
    ...font.styles,
    ...shadow.styles,
  };

  const attrs = {
    ...color.attrs,
    ...border.attrs,
  };

  const marginAsPadding = marginStyleToPadding(margin);

  // Inspired by: https://www.goodemailcode.com/email-code/link-button
  return (
    <table cellPadding={0} cellSpacing={0} border={0}>
      <tbody>
        <tr>
          <td style={{ ...marginAsPadding.styles }}>
            <a
              href="https://example.com/"
              {...attrs}
              style={{
                ...style,
                display: "inline-block",
                textDecoration: "none",
                // @ts-expect-error
                "mso-padding-alt": 0,
              }}
            >
              <MsoConditional
                startMso={[
                  `<i`,
                  `style="letter-spacing: ${
                    padding.styles.paddingLeft
                  };mso-font-width:-100%;mso-text-raise:${
                    (getPxValue(padding.styles.paddingBottom) ?? 0) +
                    (getPxValue(padding.styles.paddingTop) ?? 0)
                  }px"`,
                  `hidden>`,
                  `&nbsp;`,
                  `</i>`,
                ].join(" ")}
                endMso={[
                  `<i`,
                  `style="letter-spacing: ${padding.styles.paddingRight};mso-font-width:-100%"`,
                  `hidden>`,
                  `&nbsp;`,
                  `</i>`,
                ].join(" ")}
              >
                <span
                  style={{
                    // @ts-expect-error
                    "mso-text-raise": padding.styles.paddingBottom,
                  }}
                >
                  {props.children}
                </span>
              </MsoConditional>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
