import { createMjmlElement } from '../utils/create-mjml-element';

export type FontProps = {
  href?: string | undefined;
  name?: string | undefined;
};
export const Font = createMjmlElement<FontProps>('mj-font');
