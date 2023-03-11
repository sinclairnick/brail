export * from "./components";
export * from "./render";
export * from "./template";
export * from "./styles/theme";
export type {
  AnyCreateTemplateReturn,
  AnyMeta,
  AnyOnSendFn,
  AnyTemplateConfig,
  AnyTemplateMap,
  AnyTemplateProps,
  BrailOptions,
  CreateTemplateArgs,
  CreateTemplateReturn,
  OnSendFn,
  RenderResult,
  SchemaOf,
  TemplateConfig,
  TemplatePreview,
  TemplateProperties,
} from "@brail/types";

import { InitBrail, initBrail } from "./brail";
export { initBrail } from "./brail";

type BrailRoot = {
  init: () => InitBrail;
};

const root: BrailRoot = { init: initBrail };

export default root;
