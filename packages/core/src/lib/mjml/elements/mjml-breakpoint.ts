import { createMjmlElement } from '../utils/create-mjml-element';

export type MjmlBreakpointProps = {
  width?: string | number | undefined;
};
export const MjmlBreakpoint =
  createMjmlElement<MjmlBreakpointProps>('mj-breakpoint');
