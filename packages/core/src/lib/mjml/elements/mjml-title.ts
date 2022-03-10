import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlTitleProps = {
  children?: string | undefined;
};

export const MjmlTitle = createMjmlElement<MjmlTitleProps>('mj-title');