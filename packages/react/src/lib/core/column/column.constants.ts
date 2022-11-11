import React from 'react';
import { ParentContextType } from '../parent-provider/parent-provider.types';
import { LangUtil } from '../util/lang.util';
import { ColumnProps } from './column.types';

export const getColumnAttr = (
  props: ColumnProps,
  parent: ParentContextType
) => {
  return {
    msoTd: <React.TdHTMLAttributes<HTMLTableCellElement>>{
      ...LangUtil.omit(props, ['children', 'width', 'minWidth', 'maxWidth']),
      width: props.maxWidth ?? props.width,
    },
    div: <React.HTMLAttributes<HTMLDivElement>>{
      style: {
        ...LangUtil.omit(props, ['children']),
        verticalAlign: props.verticalAlign ?? parent.verticalAlign,
      },
    },
  };
};
