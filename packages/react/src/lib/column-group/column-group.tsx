import { Mj } from '@brail/core';

export type GroupProps = Mj.GroupProps;

export const ColumnGroup = (props: GroupProps) => {
  return <Mj.Group {...props} />;
};
