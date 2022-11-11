import React, { PropsWithChildren } from 'react';
import { ConditionalCommentWrapper } from '../html/conditional-wrapper.component';
import {
  ParentProvider,
  useParent,
} from '../parent-provider/parent-provider.component';
import { Table } from '../table/table.component';
import { Td } from '../table/td.component';
import { Tr } from '../table/tr.component';
import { SpacingUtil } from '../util/spacing.utli';
import {
  BorderAttributes,
  Direction,
  FontAttributes,
  PaddingAttributes,
} from '../util/util.types';

export type RowProps = PaddingAttributes &
  BorderAttributes &
  Pick<FontAttributes, 'textAlign'> &
  PropsWithChildren<{
    dir?: Direction;
  }>;

export const Row = (props: RowProps) => {
  const parent = useParent();
  const nextParentWidth = SpacingUtil.getBoxWidth(parent.width, props);

  return (
    <Table>
      <Tr>
        <Td>
          <ConditionalCommentWrapper
            start={`<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>`}
            end={`</tr></table>`}
          >
            <ParentProvider width={nextParentWidth}>
              {props.children}
            </ParentProvider>
          </ConditionalCommentWrapper>
        </Td>
      </Tr>
    </Table>
  );
};
