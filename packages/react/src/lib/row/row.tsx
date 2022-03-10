import { Mj } from '@brail/core';

export type RowProps = Mj.SectionProps;

export const Row = (props: RowProps) => {
  return <Mj.Section padding={0} {...props} />;
};
