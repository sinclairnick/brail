import { AnyTemplateMap } from "@brail/types";
import type { NextApiHandler } from "next";
import { AnyTrpc } from "../trpc";

// TODO: Support more frameworks
export type ApiHandler = NextApiHandler;

export type InitDevtoolsArgs = {
  isEnabled?: boolean;
  templates: AnyTemplateMap;
  t?: AnyTrpc;
};

export type DevtoolsConfig = {
  templates: AnyTemplateMap;
  isEnabled: boolean;
  t: AnyTrpc;
};
