import React from "react";
import {
  getAxisSpacing,
  getPxValue,
  normalizeMarginStyle,
  normalizePaddingStyle,
} from "../../styles";
import { useParentDimensions } from "../../util/parent-provider";
import { RowContext, RowProviderProps } from "./row.types";

const RowContext = React.createContext<RowContext | null>(null);

export const useRowContext = () => {
  const context = React.useContext(RowContext);

  if (!context) {
    throw new Error("useRowContext must be used within a RowContext");
  }

  return context;
};

export const RowProvider = (props: RowProviderProps) => {
  const { stack = true } = props;
  const parentCtx = useParentDimensions();
  const totalWidth = parentCtx.width;

  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const specifiedWidths = children
    .map((child) => {
      const width = getPxValue(child.props.width, totalWidth);
      if (width == null) return;
      const margin = normalizeMarginStyle(child.props);
      const padding = normalizePaddingStyle(child.props);
      const axis = getAxisSpacing({ margin, padding });
      const total = width + (axis.left + axis.right);
      return Math.max(total, child.props.minWidth ?? 0);
    })
    .filter((x) => x != null);

  const absPredefined =
    specifiedWidths.reduce((s, w) => (s ?? 0) + (w ?? 0), 0) ?? 0;
  const absRemaining = parentCtx.width - absPredefined;
  const absColumnDefault = Math.floor(
    absRemaining / (children.length - specifiedWidths.length)
  );

  const abs: RowContext["abs"] = {
    columnDefault: absColumnDefault,
    predefined: absPredefined,
    remaining: absRemaining,
  };

  const relative: RowContext["relative"] = {
    columnDefault: `${Number(
      ((absColumnDefault / totalWidth) * 100).toPrecision(3)
    )}%`,
    predefined: `${Number(
      ((absPredefined / totalWidth) * 100).toPrecision(3)
    )}%`,
    remaining: `${Number(((absRemaining / totalWidth) * 100).toPrecision(3))}%`,
  };

  return (
    <RowContext.Provider value={{ totalWidth, abs, relative, stack }}>
      {children}
    </RowContext.Provider>
  );
};
