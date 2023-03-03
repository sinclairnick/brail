import React, { PropsWithChildren, useContext } from "react";
import { TypographyContext, TypographyProviderProps } from "./typography.types";

const TypographyContext = React.createContext<TypographyContext | null>(null);

export const useTypographyContext = () => {
  const context = React.useContext(TypographyContext);

  if (!context) {
    throw new Error(
      "useTypographyContext must be used within a TypographyProvider"
    );
  }

  return context;
};

/**
 * Intended to enable DX where user sets font properties at higher level, but
 * they are applied at lowest possible level, mimicking CSS cascading.
 */
export const TypographyProvider = (
  props: PropsWithChildren<TypographyProviderProps>
) => {
  const existingContext = useContext(TypographyContext);

  const value: TypographyContext = {
    // Allow nesting contexts to override values
    ...existingContext,
    ...props,
  };

  return (
    <TypographyContext.Provider value={value}>
      {props.children}
    </TypographyContext.Provider>
  );
};
