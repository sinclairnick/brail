import React from 'react';
import { HtmlComment } from './comment.component';
import { Markup } from 'interweave';
import { RawHtml } from './raw-html.component';

export type ConditionalCommentProps = {
  negate?: boolean;
  children: string;
};

export const ConditionalComment = (props: ConditionalCommentProps) => {
  if (props.negate) {
    return (
      <>
        <HtmlComment text="<!--[if !mso | IE]><!-->" />
        <RawHtml html={props.children} />
        <HtmlComment text="<!--<![endif]-->" />
      </>
    );
  }

  return (
    <>
      <HtmlComment text="<!--[if mso | IE]>" />
      <RawHtml html={props.children} />
      <HtmlComment text="<![endif]-->" />
    </>
  );
};

export const MsoConditionalComment = (props: ConditionalCommentProps) => {
  if (props.negate) {
    return (
      <>
        <HtmlComment text="<!--[if !mso><!-->" />
        <RawHtml html={props.children} />
        <HtmlComment text="<!--<![endif]-->" />
      </>
    );
  }

  return (
    <>
      <HtmlComment text="<!--[if mso]>" />
      <RawHtml html={props.children} />
      <HtmlComment text="<![endif]-->" />
    </>
  );
};
