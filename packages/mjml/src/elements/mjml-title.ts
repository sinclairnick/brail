import { createMjmlElement } from '../utils/create-mjml-element';

export type TitleProps = {
  children?: string | undefined;
};

export const Title = createMjmlElement<TitleProps>('mj-title');