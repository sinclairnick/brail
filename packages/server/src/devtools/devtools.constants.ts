import { DevtoolsConfig, InitDevtoolsArgs } from "./devtools.types";

export const getDevtoolsConfig = (args: InitDevtoolsArgs): DevtoolsConfig => {
  return {
    apiPath: args.apiPath ?? "/api/devtools",
    isEnabled: args.isEnabled ?? true,
    templates: args.templates,
    // Can't default this without conflicting with server/client seperation
    t: args.t,
  };
};
