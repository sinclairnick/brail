import { createMjmlElement } from '../utils/create-mjml-element';

export type StyleProps = {
  children?: string | undefined;
  inline?: boolean | undefined;
};

export const Style = createMjmlElement<StyleProps>('mj-style');
