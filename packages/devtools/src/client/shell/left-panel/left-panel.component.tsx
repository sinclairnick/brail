import { PropsWithChildren } from "react";
import { Stack } from "../../theme/theme";
import { mediaQuery } from "../../util/breakpoints.util";
import { TOP_TOOLBAR_HEIGHT } from "../top-toolbar/top-toolbar.component";

export type LeftPanelProps = PropsWithChildren<{
  width: number | string;
}>;

export const LeftPanel = (props: LeftPanelProps) => {
  return (
    <Stack
      css={{
        position: "relative",
        flex: 1,
        maxWidth: props.width,
        [mediaQuery("md")]: {
          flex: 0,
          width: 0,
          maxWidth: 0,
        },
      }}
    >
      <Stack
        css={{
          height: "100%",
          minHeight: "100vh",
          backgroundColor: "white",
          br: "2px solid $gray4",
          overflow: "scroll",
          [mediaQuery("md")]: {
            position: "absolute",
            top: TOP_TOOLBAR_HEIGHT + 2,
            left: 0,
            zIndex: 10,
            width: props.width,
          },
          [mediaQuery("sm")]: {
            width: "calc(100vw - 64px)",
          },
        }}
      >
        <Stack
          css={{
            height: TOP_TOOLBAR_HEIGHT,
            bb: "2px solid $gray4",
            [mediaQuery("md")]: {
              display: "none",
            },
          }}
        />
        <Stack css={{ flex: 1 }}>{props.children}</Stack>
      </Stack>
    </Stack>
  );
};
