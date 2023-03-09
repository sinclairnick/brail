import { withBrail } from "./next";
export { createNextDevtoolsHandler } from "./devtools";
export type { InitDevtoolsArgs } from "../devtools/devtools.types";

module.exports = withBrail;
export default withBrail;
