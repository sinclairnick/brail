import { createNextDevtoolsHandler } from "brail/next";
import { templates } from "../../../brail/templates.generated";

export default createNextDevtoolsHandler({
  templates,
  // Pass a custom tRPC here to add custom middlewares etc. to devtools.
  // t: {...}
});
