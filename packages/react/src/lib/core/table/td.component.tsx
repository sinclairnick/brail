import React from 'react';
import { PropsWithChildren } from 'react';

export type TdProps = PropsWithChildren<
  React.TdHTMLAttributes<HTMLTableCellElement>
>;

export const Td = (props: TdProps) => {
  return <td {...props} />;
};
