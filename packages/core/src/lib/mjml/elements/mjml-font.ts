import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlFontProps = {
  href?: string | undefined;
  name?: string | undefined;
};
export const MjmlFont = createMjmlElement<MjmlFontProps>('mj-font');
