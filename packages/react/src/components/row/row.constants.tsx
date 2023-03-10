import React from "react";
import {
  getAxisSpacing,
  getPxValue,
  normalizeMarginStyle,
  normalizePaddingStyle,
  PercentValue,
} from "../../styles";
import { useParentDimensions } from "../../util/parent-provider";
import { RowContext, RowProviderProps } from "./row.types";
import { Children } from "react";

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
  const specifiedWidths = Children.toArray(children)
    .filter((x): x is JSX.Element => Boolean(x))
    .map((child) => {
      console.log(child);
      const width = getPxValue(child.props.width, totalWidth);
      if (width == null) return;
      const margin = normalizeMarginStyle(child.props);
      const padding = normalizePaddingStyle(child.props);
      const axis = getAxisSpacing({ margin, padding });
      const total = width + (axis.left + axis.right);
      return Math.max(total, child.props.minWidth ?? 0);
    })
    .filter(Boolean);

  const absPredefined =
    specifiedWidths.reduce((s, w) => (s ?? 0) + (w ?? 0), 0) ?? 0;
  const absRemaining = parentCtx.width - absPredefined;
  const unspecifiedCount = children.length - specifiedWidths.length;
  const absColumnDefault =
    unspecifiedCount === 0 ? 0 : Math.floor(absRemaining / unspecifiedCount);

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

  const getAbsWidth: RowContext["getAbsWidth"] = (value) => {
    return getPxValue(value, totalWidth) as number;
  };

  const getPctWidth: RowContext["getPctWidth"] = (value) => {
    if (value.toString().endsWith("%")) return value as PercentValue;

    const pxValue = getPxValue(value) as number;

    return `${(pxValue / totalWidth) * 100}%`;
  };

  return (
    <RowContext.Provider
      value={{ totalWidth, abs, relative, stack, getPctWidth, getAbsWidth }}
    >
      {children}
    </RowContext.Provider>
  );
};
