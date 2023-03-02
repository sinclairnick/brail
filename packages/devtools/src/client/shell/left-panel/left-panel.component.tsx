import { PropsWithChildren } from "react";
import { Stack } from "../../theme/theme";
import { TOP_TOOLBAR_HEIGHT } from "../top-toolbar/top-toolbar.component";

export type LeftPanelProps = PropsWithChildren<{
  width: number | string;
}>;

export const LeftPanel = (props: LeftPanelProps) => {
  return (
    <Stack
      css={{
        height: "100%",
        minHeight: "100vh",
        maxWidth: props.width,
				flex: 1,
        backgroundColor: "white",
        br: "2px solid $gray4",
      }}
    >
      <Stack css={{ height: TOP_TOOLBAR_HEIGHT, bb: "2px solid $gray4" }} />
      <Stack css={{ flex: 1 }}>{props.children}</Stack>
    </Stack>
  );
};
