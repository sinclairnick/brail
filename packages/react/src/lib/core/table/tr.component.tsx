import React from 'react';

export type TrProps = React.HTMLAttributes<HTMLTableRowElement>;

export const Tr = (props: TrProps) => {
  return <tr {...props} />;
};
