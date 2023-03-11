export * from "./components";
export * from "./render";
export * from "./template";
export * from "./styles/theme";
export * from "@brail/types";

import { InitBrail, initBrail } from "./brail";
export { initBrail } from "./brail";

type BrailRoot = {
  init: () => InitBrail;
};

const root: BrailRoot = { init: initBrail };

export default root;
