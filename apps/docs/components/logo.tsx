import { useTheme } from "nextra-theme-docs";

export const Logo = () => {
  const theme = useTheme();
  const src = theme.resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png";

  return <img src={src} width={200} />;
};
