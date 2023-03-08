import { AppShell } from "../shell/shell.component";
import type { AnyTemplateMap } from "@brail/types";
import { PropsWithChildren } from "react";
import { globalStyles } from "../theme/theme";
import {
  DevtoolsProvider,
  DevtoolsProviderProps,
} from "../context/devtools-context.component";

export type DevtoolsProps = PropsWithChildren<{
  templates: AnyTemplateMap;
}> &
  Pick<DevtoolsProviderProps, "apiPath">;

export const Devtools = (props: DevtoolsProps) => {
  globalStyles();

  return (
    <DevtoolsProvider apiPath={props.apiPath}>
      <AppShell templates={props.templates}>{props.children}</AppShell>
    </DevtoolsProvider>
  );
};

/**
 *  Creates devtools with all props pre-passed in.
 * Basically just curries the devtools component.
 */
export const createDevtools = (
  args: Omit<DevtoolsProps, "children">
): ((props: Pick<DevtoolsProps, "children">) => JSX.Element) => {
  return (props) => <Devtools {...args} {...props} />;
};
