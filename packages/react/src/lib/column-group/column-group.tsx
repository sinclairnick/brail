import { MjmlGroupProps, MjmlGroup } from '@brail/core';

export type GroupProps = MjmlGroupProps;

export const ColumnGroup = (props: GroupProps) => {
  return <MjmlGroup {...props} />;
};
