import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlStyleProps = {
  children?: string | undefined;
  inline?: boolean | undefined;
};

export const MjmlStyle = createMjmlElement<MjmlStyleProps>('mj-style');
