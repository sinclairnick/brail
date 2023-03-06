import * as Brail from "@brail/react";
import { BASE_URL, theme } from "../../brail/react";

export const stackOverflowTheme = theme
  .font({
    $arial: "Arial",
  })
  .palette({
    $white: "#ffffff",
    $grey50: "#FAFAFA",
    $blue500: "#0077cc",
  })
  .spacing({
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
  })
  .create();

export const Email = stackOverflowTheme.styled(Brail.Email, {
  backgroundColor: "$grey50",
  fontFamily: "$arial",
  baseUrl: BASE_URL,
});

export const Button = stackOverflowTheme.styled(Brail.Button, {
  color: "$blue500",
  backgroundColor: "$white",
  px: 17,
  py: 13,
  borderRadius: "$1",
});
