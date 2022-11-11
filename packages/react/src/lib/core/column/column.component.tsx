import React from 'react';
import { ConditionalCommentWrapper } from '../html/conditional-wrapper.component';
import {
  ParentProvider,
  useParent,
} from '../parent-provider/parent-provider.component';
import { HtmlUtil } from '../util/html.util';
import { SpacingUtil } from '../util/spacing.utli';
import { getColumnAttr } from './column.constants';
import { ColumnProps } from './column.types';

export const Column = (props: ColumnProps) => {
  const parent = useParent();
  const nextParentWidth = SpacingUtil.getBoxWidth(parent.width, props);

  const columnAttr = getColumnAttr(props, parent);

  return (
    <ConditionalCommentWrapper
      start={`<td ${HtmlUtil.toAttributes(columnAttr.msoTd)} >`}
      end={`</td>`}
    >
      <div {...columnAttr.div}>
        <ParentProvider width={nextParentWidth}>
          {props.children}
        </ParentProvider>
      </div>
    </ConditionalCommentWrapper>
  );
};
