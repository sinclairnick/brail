import { createDevtools } from "@brail/devtools";
import type { NextApiHandler } from "next";
import { DevtoolsStub } from "../devtools-ui-stub";
import { getDevtoolsConfig } from "../devtools.constants";
import { InitDevtoolsArgs, InitDevtoolsReturn } from "../devtools.types";
import { createNextNoop, createTrpcNext } from "./trpc-api";

export const initNextDevtools = (
  args: InitDevtoolsArgs
): InitDevtoolsReturn<NextApiHandler> => {
  const { apiPath, isEnabled, t, templates } = getDevtoolsConfig(args);

  if (!isEnabled) {
    return {
      DevtoolsLayout: DevtoolsStub,
      devtoolsHandler: () => createNextNoop(),
    };
  }

  return {
    DevtoolsLayout: createDevtools({ apiPath, templates }),
    devtoolsHandler: () => createTrpcNext({ templates, t }),
  };
};
