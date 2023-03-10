import type { NextConfig } from "next";
import type { Configuration } from "webpack";
import { BrailOptions } from "@brail/types";
import { optionsToConfig, DEFAULT_PAGE_EXTENSIONS } from "../util/brail.util";
import {
  BrailCollectTemplatesPlugin,
  BrailEmitTemplatesPlugin,
} from "./webpack/plugins";

export type WithBrailFn = (
  opts: BrailOptions
) => (config: NextConfig) => NextConfig;

export const withBrail: WithBrailFn =
  (opts: BrailOptions) => (config: NextConfig) => {
    const brailConfig = optionsToConfig(opts, config);

    config.pageExtensions = Array.from(
      new Set([
        ...(config.pageExtensions ?? DEFAULT_PAGE_EXTENSIONS),
        ...brailConfig.templateExtensions,
      ])
    );

    const _webpack: NextConfig["webpack"] = (
      wpConfig: Configuration,
      context
    ): Configuration => {
      wpConfig = config.webpack?.(wpConfig, context) ?? wpConfig;

      const rules = wpConfig.module?.rules ?? [];

      rules.push({
        test: /\.[j|t]sx?$/,
        exclude: [/node_modules/],
        use: [
          context.defaultLoaders.babel,
          {
            loader: "brail/next-loader",
            options: brailConfig,
          },
        ],
      });

      const plugins = wpConfig.plugins ?? [];

      if (brailConfig.emitTemplates) {
        plugins.push(new BrailEmitTemplatesPlugin(brailConfig));
      }

      plugins.push(new BrailCollectTemplatesPlugin(brailConfig));

      return {
        ...wpConfig,
        module: { ...wpConfig.module, rules },
        plugins,
      };
    };

    return { ...config, webpack: _webpack };
  };
