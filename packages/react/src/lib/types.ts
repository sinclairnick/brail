import React, { Component } from 'react';

export type MjmlType<T extends Component> = T extends Component<infer R>
  ? R
  : never;
