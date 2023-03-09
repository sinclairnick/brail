import { initTRPC } from "@trpc/server";
import { createTrpcRouter } from "../trpc";
import { DevtoolsConfig, InitDevtoolsArgs } from "./devtools.types";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

export const getDevtoolsConfig = (args: InitDevtoolsArgs): DevtoolsConfig => {
  return {
    isEnabled: args.isEnabled ?? (isDev && !isProd),
    templates: args.templates,
    // Can't default this without conflicting with server/client seperation
    t: args.t ?? initTRPC.create(),
  };
};

export const createDevtoolsTrpc = (config: DevtoolsConfig) => {
  const { isEnabled, t, templates } = config;

  const templatesRouter = config.isEnabled
    ? createTrpcRouter({ t, templates })
    : {};

  return t.router({
    templates: templatesRouter,
    __internal: t.router({
      isEnabled: t.procedure.query(() => {
        return isEnabled;
      }),
    }),
  });
};
