import { DevtoolsConfig, InitDevtoolsArgs } from "./devtools.types";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

export const getDevtoolsConfig = (args: InitDevtoolsArgs): DevtoolsConfig => {
  return {
    apiPath: args.apiPath ?? "/api/devtools",
    isEnabled: args.isEnabled ?? (isDev && !isProd),
    templates: args.templates,
    // Can't default this without conflicting with server/client seperation
    t: args.t,
  };
};
