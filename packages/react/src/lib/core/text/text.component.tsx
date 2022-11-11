import React from 'react';
import { PropsWithChildren } from 'react';
import { ConditionalCommentWrapper } from '../html/conditional-wrapper.component';
import { FontAttributes, Spacing } from '../util/util.types';

export type TextProps = PropsWithChildren<
  FontAttributes & {
    height?: Spacing<'px' | '%'>;
  }
>;

export const Text = (props: TextProps) => {
  const content = (
    <p style={{ fontFamily: props.fontFamily }}>{props.children}</p>
  );

  if (props.height) {
    return (
      <ConditionalCommentWrapper
        start={`<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="${props.height}" style="vertical-align:top;height:${props.height};">`}
        end={`</td></tr></table>`}
      >
        {content}
      </ConditionalCommentWrapper>
    );
  }
  return <>{content}</>;
};
