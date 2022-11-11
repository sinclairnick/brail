import { ReactNode } from 'react';

export type ValidatedProps<P> = Partial<{
  [key in keyof P]: string | undefined;
}>;
export type DefaultProps<P> = Partial<P>;

export type CreateComponentArgs<P> = {
  Component: (props: P) => JSX.Element;
  defaultProps: DefaultProps<P>;
  validateProps: (props: P) => ValidatedProps<P>;
  validateChildren: (children: ReactNode) => string | undefined;
};

export const createComponent = <P>(args: CreateComponentArgs<P>) => {
  return args;
};
