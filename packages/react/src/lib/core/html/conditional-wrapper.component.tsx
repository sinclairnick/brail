import React from 'react';
import { PropsWithChildren } from 'react';
import {
  ConditionalComment,
  ConditionalCommentProps,
  MsoConditionalComment,
} from './conditional-comment.component';

export type ConditionalProps = PropsWithChildren<{
  when: boolean;
  Wrapper: (props: PropsWithChildren<unknown>) => JSX.Element;
}>;

export const Conditional = (props: ConditionalProps) => {
  const { Wrapper, when, children } = props;

  if (when) {
    return <Wrapper>{children}</Wrapper>;
  }

  return <>{children}</>;
};

export type ConditionalWrapperProps = Pick<ConditionalCommentProps, 'negate'> &
  PropsWithChildren<{
    start: ConditionalCommentProps['children'];
    end: ConditionalCommentProps['children'];
  }>;

export const ConditionalCommentWrapper = (props: ConditionalWrapperProps) => {
  const { end, start, children, negate } = props;

  return (
    <>
      <ConditionalComment negate={negate}>{start}</ConditionalComment>
      {children}
      <ConditionalComment negate={negate}>{end}</ConditionalComment>
    </>
  );
};

export const MsoConditionalCommentWrapper = (
  props: ConditionalWrapperProps
) => {
  const { end, start, children, negate } = props;

  return (
    <>
      <MsoConditionalComment negate={negate}>{start}</MsoConditionalComment>
      {children}
      <MsoConditionalComment negate={negate}>{end}</MsoConditionalComment>
    </>
  );
};
