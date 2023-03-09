import { useState } from "react";

export type AsyncState<T extends any = unknown, E extends any = unknown> = {
  isLoading: boolean;
  data: T | undefined;
  error: E | undefined;
  hasRun: boolean;
};

export type UseAsyncReturn<T, E> = [
  AsyncState<T, E>,
  (fn: () => Promise<any>) => void
];

export const useAsync = <
  T extends any = unknown,
  E extends any = unknown
>(): UseAsyncReturn<T, E> => {
  const [state, setState] = useState<AsyncState<T, E>>({
    data: undefined,
    error: undefined,
    isLoading: false,
    hasRun: false,
  });

  return [
    state,
    (fn) => {
      setState((s) => ({ ...s, isLoading: true }));
      fn()
        .then((data) => {
          setState((s) => ({ ...s, data, isLoading: false, hasRun: true }));
        })
        .catch((e) => {
          setState((s) => ({ ...s, error: e, isLoading: false, hasRun: true }));
        })
        .finally(() => {
          setState((s) => ({ ...s, isLoading: false }));
        });
    },
  ];
};
