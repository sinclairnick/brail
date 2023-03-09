const MD_BREAKPOINT = 900;

const SM_BREAKPOINT = 480;

export const Breakpoints = {
  md: MD_BREAKPOINT,
  sm: SM_BREAKPOINT,
};

export type Breakpoint = "sm" | "md";

export const mediaQuery = (breakpoint: Breakpoint) => {
  return `@media screen and (max-width: ${Breakpoints[breakpoint]}px)`;
};
