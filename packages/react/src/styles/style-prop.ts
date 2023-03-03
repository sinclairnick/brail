import { kebabCase } from "../util/string.util";

export const styleObjectToInline = (styles?: Record<string, unknown>) => {
  return Object.entries(styles ?? {})
    .filter(([key, value]) => value !== undefined)
    .map(([key, _value]) => {
      const value = typeof _value === "number" ? `${_value}px` : _value;
      return `${kebabCase(key)}: ${value}`;
    })
    .join("; ");
};

export const attrObjectToInline = (attrs?: Record<string, unknown>) => {
  return Object.entries(attrs ?? {})
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => {
      return `${key}="${value}"`;
    })
    .join(" ");
};
