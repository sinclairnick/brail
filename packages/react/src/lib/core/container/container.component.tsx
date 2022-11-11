import React from 'react';
import {
  ParentProvider,
  useParent,
} from '../parent-provider/parent-provider.component';
import { OptionalParentConsumerProps } from '../parent-provider/parent-provider.types';
import { Table } from '../table/table.component';
import { Td } from '../table/td.component';
import { Tr } from '../table/tr.component';
import { LangUtil } from '../util/lang.util';
import { SpacingUtil } from '../util/spacing.utli';
import {
  BackgroundAttributes,
  BorderAttributes,
  PaddingAttributes,
} from '../util/util.types';

export type ContainerProps = PaddingAttributes &
  BorderAttributes &
  BackgroundAttributes &
  Pick<OptionalParentConsumerProps, 'children'>;

export const Container = (props: ContainerProps) => {
  const parent = useParent();
  const nextParentWidth = SpacingUtil.getBoxWidth(parent.width, props);

  return (
    <Table>
      <Tr>
        <Td
          style={{
            ...LangUtil.omit(props, ['children']),
            maxWidth: parent.width,
          }}
        >
          <ParentProvider width={nextParentWidth}>
            {props.children}
          </ParentProvider>
        </Td>
      </Tr>
    </Table>
  );
};
