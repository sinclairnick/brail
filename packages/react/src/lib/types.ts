import React from 'react';

export type MjmlType<T extends React.Component> = T extends React.Component<
  infer R
>
  ? R
  : never;
