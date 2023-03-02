import { AnyTheme, CreateThemeReturn, ExtendFn, StyledFn } from "./theme.types";
import { substitutePropsTokens } from "./theme.util";

export const createTheme = <TTheme extends AnyTheme = AnyTheme>(
  theme: TTheme
): CreateThemeReturn<TTheme> => {
  const styled: StyledFn<TTheme> = (Component, defaults) => {
    const defaultsSubbed = substitutePropsTokens(defaults || {}, theme);

    return (props) => {
      const propsSubbed = substitutePropsTokens(props, theme);

      return <Component {...defaultsSubbed} {...(propsSubbed as any)} />;
    };
  };

  const extend: ExtendFn<TTheme> = (_theme) => {
    return createTheme({
      font: { ...theme.font, ..._theme.font },
      palette: { ...theme.palette, ..._theme.palette },
      spacing: { ...theme.spacing, ..._theme.spacing },
      shadow: { ...theme.shadow, ..._theme.shadow },
      utils: { ...theme.utils, ..._theme.utils },
    });
  };

  return {
    config: theme,
    extend,
    styled,
    utils: theme.utils,
  } as any;
};
