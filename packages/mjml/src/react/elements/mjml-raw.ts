import { ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type RawProps = { children?: ReactNode };

export const Raw = createMjmlElement<RawProps>('mj-raw');
