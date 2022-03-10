import { ReactNode } from 'react';
import { createMjmlElement } from '../utils/create-mjml-element';

export type HeadProps = { children?: ReactNode };

export const Head = createMjmlElement<HeadProps>('mj-head');
