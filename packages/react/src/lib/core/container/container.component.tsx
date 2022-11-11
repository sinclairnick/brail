import React from 'react';
import { ConditionalCommentWrapper } from '../html/conditional-wrapper.component';
import {
  ParentProvider,
  useParent,
} from '../parent-provider/parent-provider.component';
import { OptionalParentConsumerProps } from '../parent-provider/parent-provider.types';
import { Table } from '../table/table.component';
import { Td } from '../table/td.component';
import { Tr } from '../table/tr.component';
import { HtmlUtil } from '../util/html.util';
import { LangUtil } from '../util/lang.util';
import { SpacingUtil } from '../util/spacing.utli';
import {
  AlignmentAttributes,
  BackgroundAttributes,
  BorderAttributes,
  PaddingAttributes,
} from '../util/util.types';

export type ContainerProps = PaddingAttributes &
  BorderAttributes &
  BackgroundAttributes &
  AlignmentAttributes &
  Pick<OptionalParentConsumerProps, 'children'>;

export const Container = (props: ContainerProps) => {
  const parent = useParent();
  const nextParentWidth = SpacingUtil.getBoxWidth(parent.width, props);

  return (
    <div style={{ maxWidth: parent.width, width: '100%' }}>
      <ConditionalCommentWrapper
        start={`<table ${HtmlUtil.toAttributes({
          width: parent.width,
          cellPadding: 0,
          cellSpacing: 0,
          role: 'presentation',
        })} /><tr><td>`}
        end={`</td></tr></table>`}
      >
        <Table style={{ maxWidth: parent.width }}>
          <Tr>
            <Td
              style={{
                ...LangUtil.omit(props, ['children']),
                textAlign: props.align,
                verticalAlign: props.verticalAlign,
              }}
            >
              <ParentProvider
                width={nextParentWidth}
                verticalAlign={props.verticalAlign ?? parent.verticalAlign}
              >
                {props.children}
              </ParentProvider>
            </Td>
          </Tr>
        </Table>
      </ConditionalCommentWrapper>
    </div>
  );
};
