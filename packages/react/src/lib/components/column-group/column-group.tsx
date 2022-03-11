import React from 'react';

import { Mj } from '@brail/mjml';

export type GroupProps = Mj.GroupProps;

export const ColumnGroup = (props: GroupProps) => {
  return <Mj.Group {...props} />;
};
