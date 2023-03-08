import { createDevtools } from "@brail/devtools";
import type { NextApiHandler } from "next";
import { DevtoolsStub } from "../devtools-ui-stub";
import { getDevtoolsConfig } from "../devtools.constants";
import { InitDevtoolsArgs, InitDevtoolsReturn } from "../devtools.types";

export const initNextDevtools = (
  args: InitDevtoolsArgs
): InitDevtoolsReturn<NextApiHandler> => {
  const { apiPath, isEnabled, t, templates } = getDevtoolsConfig(args);

  if (!isEnabled) {
    return {
      DevtoolsLayout: DevtoolsStub,
      devtoolsHandler: () => () => {},
    };
  }

  return {
    DevtoolsLayout: createDevtools({ apiPath, templates }),
    devtoolsHandler: () => {
      let handler: NextApiHandler | undefined;

      return async (req, res) => {
        const { createTrpcNext } = await import("./trpc-api");
        if (handler) return handler(req, res);
        handler = createTrpcNext({ templates, t });
        return handler(req, res);
      };
    },
  };
};
