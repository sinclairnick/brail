import React, { PropsWithChildren } from "react";

export type ThemeContext = {
  breakpoints: {
    sm: number;
    xs: number;
    md: number;
    lg: number;
  };
};

const ThemeContext = React.createContext<ThemeContext | null>(null);

export const ThemeProvider = (props: PropsWithChildren) => {
  const theme: ThemeContext = {
    breakpoints: {
      xs: 374,
      sm: 413,
      md: 768,
      lg: 1024,
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
