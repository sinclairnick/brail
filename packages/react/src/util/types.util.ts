export type Expand<T extends Record<string | number | symbol, unknown>> = {
  [K in keyof T]: T[K] extends Record<string | number | symbol, unknown>
    ? Expand<T[K]>
    : T[K];
};
