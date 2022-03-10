import React from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type RawProps = { children?: React.ReactNode };

export const Raw = createMjmlElement<RawProps>('mj-body');
