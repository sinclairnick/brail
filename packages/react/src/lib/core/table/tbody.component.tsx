import React from 'react';

export type TBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TBody = (props: TBodyProps) => {
  return <tbody {...props} />;
};
