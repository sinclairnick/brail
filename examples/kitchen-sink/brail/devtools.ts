import { initNextDevtools } from "brail/devtools";
import { templates } from "./templates";

export const { DevtoolsLayout, devtoolsHandler } = initNextDevtools({
  templates,
});
