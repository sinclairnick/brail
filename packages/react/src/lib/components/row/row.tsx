import React from 'react';
import { Mj } from '@brail/mjml';

export type RowProps = Mj.SectionProps;

export const Row = (props: RowProps) => {
  return <Mj.Section padding={0} {...props} />;
};
