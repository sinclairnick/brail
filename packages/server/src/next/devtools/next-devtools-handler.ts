import { createNextApiHandler } from "@trpc/server/adapters/next";
import { InitDevtoolsArgs } from "../../devtools/devtools.types";
import type { NextApiHandler } from "next";
import {
  createDevtoolsTrpc,
  getDevtoolsConfig,
} from "../../devtools/devtools.constants";

export const createNextDevtoolsHandler = (
  opts: InitDevtoolsArgs
): NextApiHandler => {
  const config = getDevtoolsConfig(opts);

  const appRouter = createDevtoolsTrpc(config);

  return createNextApiHandler({ router: appRouter });
};
