import { createMjmlElement } from '../utils/create-mjml-element';

export type BreakpointProps = {
  width?: string | number | undefined;
};
export const Breakpoint =
  createMjmlElement<BreakpointProps>('mj-breakpoint');
