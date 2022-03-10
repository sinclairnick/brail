import { MjmlGroup, MjmlColumnProps } from '@brail/core';

export type ColumnProps = MjmlColumnProps;

export const Column = (props: ColumnProps) => {
  return <MjmlGroup padding={0} {...props} />;
};
