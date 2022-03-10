import { Mj } from '@brail/core';

export type ColumnProps = Mj.ColumnProps;

export const Column = (props: ColumnProps) => {
  return <Mj.Column padding={0} {...props} />;
};
