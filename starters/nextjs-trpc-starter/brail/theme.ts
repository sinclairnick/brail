import * as B from "@brail/react";
import { theme } from "./base";

export const BASE_URL =
  (process.env.VERCEL_URL as B.AbsoluteUrl) ?? "http://localhost:3000";

export const myTheme = theme
  .font({ $arial: "Arial" })
  .palette({
    white: "#ffffff",
    grey50: "#FAFAFA",
    grey100: "#EEEEEE",
    brailMain: "#1B448D",
  })
  .spacing({
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
  })
  .create();

export const Email = myTheme.styled(B.Email, {
  backgroundColor: "$grey50",
  fontFamily: "$arial",
  baseUrl: BASE_URL, // Set base URL only once for convenience
});

export const Button = myTheme.styled(B.Button, {
  color: "$blue500",
  backgroundColor: "$white",
  px: 17,
  py: 13,
  borderRadius: "$1",
});
