import React, { createContext, useContext } from 'react';
import {
  OptionalParentConsumerProps,
  ParentContextType,
  ParentProviderProps,
} from './parent-provider.types';

/** Allows us to divide into 2,3,4 easily */
const DIVISIBLE_WIDTH = 1 * 2 * 3 * 4 * 25; // 600

const ParentContext = createContext<ParentContextType>({
  width: DIVISIBLE_WIDTH,
});

const OptionalConsumer = (props: OptionalParentConsumerProps) => {
  console.log(props.children, typeof props.children);

  return (
    <ParentContext.Consumer>
      {(ctx) => (
        <>
          {typeof props.children === 'function'
            ? props.children(ctx)
            : props.children}
        </>
      )}
    </ParentContext.Consumer>
  );
};

export const ParentProvider = (props: ParentProviderProps) => {
  return (
    <ParentContext.Provider value={props}>
      <OptionalConsumer>{props.children}</OptionalConsumer>
    </ParentContext.Provider>
  );
};

export const useParent = () => useContext(ParentContext);
