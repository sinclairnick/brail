import { createStitches, CSSProperties, globalCss } from "@stitches/react";
import { blue, green, gray, yellow, red } from "@radix-ui/colors";

export const { css, styled, theme, reset } = createStitches({
  theme: {
    fonts: {
      base: "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    },
    colors: {
      ...blue,
      ...gray,
      ...green,
      ...yellow,
      ...yellow,
      ...red,
      brail100: "#E2EBFA",
      brail300: "#95B5EB",
      brail700: "#1B448D",
    },
    space: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
    },
  },
  utils: {
    direction: (direction: CSSProperties["flexDirection"]) => {
      return { flexDirection: direction };
    },
    p: (x: number) => ({ padding: x * 4 }),
    py: (x: number) => ({ paddingTop: x * 4, paddingBottom: x * 4 }),
    px: (x: number) => ({ paddingLeft: x * 4, paddingRight: x * 4 }),
    br: (x: string) => ({ borderRight: x }),
    bl: (x: string) => ({ borderLeft: x }),
    bt: (x: string) => ({ borderTop: x }),
    bb: (x: string) => ({ borderBottom: x }),
  },
});

export const globalStyles = globalCss({
  body: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
});

export const Button = styled("button", {
  fontFamily: "$base !important",
  background: "none",
  color: "inherit",
  border: "none",
  padding: 0,
  font: "inherit",
  cursor: "pointer",
  outline: "inherit",
  p: 2,
  borderRadius: "4px",
  fontSize: 14,
  "&:hover": {
    background: "$gray2",
  },
});

export const Stack = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const Typography = styled("p", {
  fontFamily: "$base",
  marginTop: 0,
  marginBottom: 0,
});

export const Input = styled("input", {
  fontFamily: "$base",
  padding: "$2",
  borderRadius: "$2",
  border: "1px solid $gray3",
  backgroundColor: "$gray1",
  "&:focus": {
    borderColor: "$blue3",
  },
});
