const MD_BREAKPOINT = "768";

const SM_BREAKPOINT = "480";

const breakpoints = {
  md: MD_BREAKPOINT,
  sm: SM_BREAKPOINT,
};

export type Breakpoint = "sm" | "md";

export const mediaQuery = (breakpoint: Breakpoint) => {
  return `@media screen and (max-width: ${breakpoints[breakpoint]}px)`;
};
