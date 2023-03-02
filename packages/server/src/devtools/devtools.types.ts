import { Devtools } from "@brail/devtools/";
import { AnyTemplateMap } from "@brail/types";
import type { NextApiHandler } from "next";
import { PropsWithChildren } from "react";
import { AnyTrpc } from "../trpc";

// TODO: Support more frameworks
export type ApiHandler = NextApiHandler;

export type InitDevtoolsArgs = {
  apiPath?: string;
  isEnabled?: boolean;
  templates: AnyTemplateMap;
  t?: AnyTrpc;
};

export type DevtoolsConfig = {
  apiPath: string;
  templates: AnyTemplateMap;
  isEnabled: boolean;
  t?: AnyTrpc;
};

export type InitDevtoolsReturn<THandler extends ApiHandler> = {
  DevtoolsLayout: (props: PropsWithChildren) => JSX.Element;
  devtoolsHandler: () => THandler;
};
