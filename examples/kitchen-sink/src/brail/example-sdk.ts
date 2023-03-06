import { createSdk } from "brail/sdk";
import { templates } from "../.brail/templates.generated";

// This can now be exported as a lib or used directly
export const email = createSdk(templates);
