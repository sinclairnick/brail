import React, { Component } from 'react';
import { ClassNameProps } from '../types';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlBodyProps = {
  children?: React.ReactNode;
  width?: number | undefined;
  backgroundColor?: React.CSSProperties['backgroundColor'] | undefined;
} & ClassNameProps;

export const MjmlBody = createMjmlElement<MjmlBodyProps>('mj-body');
