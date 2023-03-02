export type ResponsiveValueArray<T> = [T] | [T, T] | [T, T, T] | [T, T, T, T];
export type ResponsiveValueObject<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
};
export type ResponsiveValue<T> =
  | T
  | ResponsiveValueArray<T>
  | ResponsiveValueObject<T>;

export type ResponsiveValueReturn<T> = {
  base: T | undefined;
  xs: T | undefined;
  sm: T | undefined;
  md: T | undefined;
  lg: T | undefined;
};

export const getReponsiveValues = <T>(
  value: ResponsiveValue<T>
): ResponsiveValueReturn<T> => {
  if (Array.isArray(value)) {
    const [xs, sm, md, lg] = value;
    const base = [lg, md, sm, xs].find((v) => v !== undefined);

    return { base, lg, md, sm, xs };
  }
  if (
    typeof value === "object" &&
    value != null &&
    ("xs" in value || "md" in value || "sm" in value || "lg" in value)
  ) {
    const { xs, sm, md, lg } = value;
    const base = [lg, md, sm, xs].find((v) => v !== undefined);

    return { base, lg, md, sm, xs };
  }

  if (typeof value !== "object") {
    return {
      base: value,
      lg: undefined,
      md: undefined,
      sm: undefined,
      xs: undefined,
    };
  }

  return {
    base: undefined,
    lg: undefined,
    md: undefined,
    sm: undefined,
    xs: undefined,
  };
};
