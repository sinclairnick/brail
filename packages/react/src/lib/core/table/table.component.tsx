import React, { PropsWithChildren } from 'react';

export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

export const Table = (props: TableProps) => {
  return (
    <table
      {...{ border: 0, cellPadding: 0, cellSpacing: 0 }}
      width="100%"
      role="presentation"
      {...props}
    />
  );
};
