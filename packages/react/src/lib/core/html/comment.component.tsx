import React from 'react';
import { RawHtml } from './raw-html.component';

export type HtmlCommentProps = {
  text: string;
};

export const HtmlComment = (props: HtmlCommentProps) => {
  return <RawHtml html={props.text} />;
};
