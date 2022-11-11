import React, { PropsWithChildren } from 'react';
import { LangUtil } from '../util/lang.util';
import {
  Align,
  BackgroundAttributes,
  BorderAttributes,
  Spacing,
  SpacingAttributes,
  VerticalAlign,
} from '../util/util.types';

export type ColumnProps = BorderAttributes &
  SpacingAttributes &
  BackgroundAttributes &
  PropsWithChildren<{
    width?: Spacing<'px' | '%'>;
    verticalAlign?: VerticalAlign;
    align?: Align;
  }>;

/* This is a simplified version of MJMLs which seemed to be unnecessarily complex. Maybe I'm wrong */
export const Column = (props: ColumnProps) => {
  const tdStyle = LangUtil.pick(props, [
    'padding',
    'paddingRight',
    'paddingLeft',
    'paddingTop',
    'paddingBottom',
    'background',
    'backgroundColor',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
  ]);

  return (
    <td
      align={props.align}
      style={{
        ...tdStyle,
        wordBreak: 'break-word',
        verticalAlign: props.verticalAlign,
      }}
    >
      <div
        style={{
          fontSize: 0,
          textAlign: 'left',
          display: 'inline-block',
          verticalAlign: props.verticalAlign,
          width: '100%',
          // TODO: width: this.getMobileWidth()
        }}
      >
        {props.children}
      </div>
    </td>
  );
};
