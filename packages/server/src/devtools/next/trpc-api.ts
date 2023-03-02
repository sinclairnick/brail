import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createTrpcRouter } from "../../trpc";
import { DevtoolsConfig } from "../devtools.types";
import type { NextApiHandler } from "next";
import { initTRPC } from "@trpc/server";

export const createTrpcNext = (
  args: Pick<DevtoolsConfig, "templates" | "t">
): NextApiHandler<any> => {
  const { templates } = args;
  const t = args.t ?? initTRPC.create();
  const appRouter = createTrpcRouter({ templates, t });

  return createNextApiHandler({ router: appRouter });
};

export const createNextNoop = (): NextApiHandler => (req, res) => {
  return res.status(404).end();
};
