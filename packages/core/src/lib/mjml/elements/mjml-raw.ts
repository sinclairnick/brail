import React, { Component } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlRawProps = { children?: React.ReactNode };

export const MjmlRaw = createMjmlElement<MjmlRawProps>('mj-raw');
