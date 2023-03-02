import React, { useContext } from "react";
import {
  adjustAbsoluteWidth,
  normalizeMarginStyle,
  normalizePaddingStyle,
  WidthValue,
} from "../styles";

export type ParentDimensionContext = {
  width: number;
};

const ParentDimensionContext =
  React.createContext<ParentDimensionContext | null>(null);

export type ParentDimensionProviderProps = {
  children: React.ReactNode;
  // Mostly used for debugging
  name?: string;
  width?: WidthValue;
  margin?: ReturnType<typeof normalizeMarginStyle>;
  padding?: ReturnType<typeof normalizePaddingStyle>;
};

export const useParentDimensions = () => {
  const ctx = React.useContext(ParentDimensionContext);

  if (!ctx) {
    throw new Error(
      "useParentDimensions must be used within a ParentDimensionProvider"
    );
  }

  return ctx;
};

/**
 * Provides the *usable* dimensions available to the children
 * after accounting for padding and margin
 */
export const ParentDimensionProvider = (
  props: ParentDimensionProviderProps
) => {
  const { margin, padding } = props;
  const existingCtx = useContext(ParentDimensionContext);
  const width = props.width ?? (existingCtx?.width as number);
  const usableWidth = adjustAbsoluteWidth({
    width,
    margin,
    padding,
  });

  const value: ParentDimensionContext = {
    width: usableWidth ?? (existingCtx?.width as number),
  };

  return (
    <ParentDimensionContext.Provider value={value}>
      {props.children}
    </ParentDimensionContext.Provider>
  );
};
