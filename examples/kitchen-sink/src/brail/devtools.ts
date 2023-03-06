import { initNextDevtools } from "brail/devtools";
import { templates } from "../.brail/templates.generated";

export const { DevtoolsLayout, devtoolsHandler } = initNextDevtools({
  templates,
});
