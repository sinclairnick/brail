import React from 'react';
import { Mj } from '@brail/mjml';

export type ColumnProps = Mj.ColumnProps;

export const Column = (props: ColumnProps) => {
  return <Mj.Column padding={0} {...props} />;
};
