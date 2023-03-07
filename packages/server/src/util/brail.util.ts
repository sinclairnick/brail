import type { NextConfig } from "next";
import { BrailOptions } from "@brail/types";
import { BrailConfig } from "../next/webpack/types";
import { detectLang, hasSrc } from "./env.util";
import path from "node:path";

const DEFAULT_BRAIL_DIR = ".brail";

export const optionsToConfig = (
  opts: BrailOptions,
  nextConfig: NextConfig
): BrailConfig => {
  const lang = detectLang();

  let rootDir = hasSrc() ? "src" : ".";
  rootDir = path.join(process.cwd(), rootDir);

  const brailDir = path.join(rootDir, opts.brailDir ?? DEFAULT_BRAIL_DIR);

  let templatesFile = "";
  if (typeof opts.emitTemplates === "string") {
    templatesFile = path.resolve(opts.emitTemplates);
  } else {
    templatesFile = path.join(brailDir, `templates.generated.${lang}`);
  }

  return {
    paths: { brailDir, templatesFile, rootDir },
    lang,
    emitTemplates: Boolean(opts.emitTemplates),
    templateExtensions:
      opts.templateExtensions ??
      nextConfig.pageExtensions ??
      DEFAULT_PAGE_EXTENSIONS,
  };
};

export const DEFAULT_PAGE_EXTENSIONS = ["js", "jsx", "ts", "tsx"];
