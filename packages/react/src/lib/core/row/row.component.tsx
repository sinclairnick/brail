import React, { PropsWithChildren } from 'react';
import { EmailProvider, useEmailContext } from '../email/email.context';
import {
  Conditional,
  ConditionalCommentWrapper,
} from '../html/conditional-wrapper.component';
import { HtmlUtil } from '../util/html.util';
import { SpacingUtil } from '../util/spacing.utli';
import {
  BorderAttributes,
  Direction,
  FontAttributes,
  SpacingAttributes,
} from '../util/util.types';

// TODO: Incoroprate background color
export type RowProps = SpacingAttributes &
  BorderAttributes &
  Pick<FontAttributes, 'textAlign'> &
  PropsWithChildren<{
    dir?: Direction;
  }>;

export const Row = (props: RowProps) => {
  const ctx = useEmailContext();
  const { boxWidth } = ctx;

  const hasBackground = false; // TODO:

  const newBoxWidth = SpacingUtil.getBoxWidth(boxWidth, props);

  return (
    <ConditionalCommentWrapper
      start={`<table style="${HtmlUtil.toInlineStyle({
        width: boxWidth,
        border: '0',
      })}" ${HtmlUtil.toAttributes({
        cellPadding: '0',
        cellSpacing: '0',
        // class: suffixCssClasses(this.getAttribute('css-class'), 'outlook'),
        role: 'presentation',
        width: boxWidth,
        // TODO: Background styles
      })}
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">`}
      end={`</td></tr></table>`}
    >
      <div
        style={{
          margin: '0px auto',
          borderRadius: props.borderRadius,
          maxWidth: boxWidth,
        }}
      >
        <Conditional
          when={hasBackground}
          Wrapper={(props) => <div>{props.children}</div>}
        >
          <table
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            style={{ borderRadius: props.borderRadius, width: '100%' }}
          >
            <tbody>
              <tr>
                <td
                  dir={props.dir}
                  style={{
                    border: props.border,
                    borderBottom: props.borderBottom,
                    borderLeft: props.borderLeft,
                    borderRight: props.borderRight,
                    borderTop: props.borderTop,
                    fontSize: 0,
                    padding: props.padding,
                    paddingBottom: props.paddingBottom,
                    paddingLeft: props.paddingLeft,
                    paddingRight: props.paddingRight,
                    paddingTop: props.paddingTop,
                    textAlign: props.textAlign,
                  }}
                >
                  <ConditionalCommentWrapper
                    start={`<table role="presentation" border="0" cellpadding="0" cellspacing="0">`}
                    end={`</table>`}
                  >
                    <ConditionalCommentWrapper start={`<tr>`} end={'</tr>'}>
                      <EmailProvider value={{ ...ctx, boxWidth: newBoxWidth }}>
                        {props.children}
                      </EmailProvider>
                    </ConditionalCommentWrapper>
                  </ConditionalCommentWrapper>
                </td>
              </tr>
            </tbody>
          </table>
        </Conditional>
      </div>
    </ConditionalCommentWrapper>
  );
};
