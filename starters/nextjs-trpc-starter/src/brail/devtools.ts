import { initNextDevtools } from "brail/devtools";
import { templates } from "./templates.generated";

export const { DevtoolsLayout, devtoolsHandler } = initNextDevtools({
  templates,
});
