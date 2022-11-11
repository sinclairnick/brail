import React from 'react';
import { Markup } from 'interweave';

export type RawHtmlProps = { html: string };

export const RawHtml = (props: RawHtmlProps) => {
  return <Markup content={props.html} />;
};
