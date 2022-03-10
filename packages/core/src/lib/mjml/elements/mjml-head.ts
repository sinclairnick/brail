import { createMjmlElement } from '../utils/create-mjml-element';

export type HeadProps = { children?: React.ReactNode };

export const Head = createMjmlElement<HeadProps>('mj-head');
