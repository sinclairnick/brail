import { nextBuild } from 'next/dist/cli/next-build';
import { nextDev } from 'next/dist/cli/next-dev';
import { nextExport } from 'next/dist/cli/next-export';
import { nextInfo } from 'next/dist/cli/next-info';
import { nextLint } from 'next/dist/cli/next-lint';
import { nextStart } from 'next/dist/cli/next-start';
import { nextTelemetry } from 'next/dist/cli/next-telemetry';

import { getProjectDir } from 'next/dist/lib/get-project-dir';
import { findPagesDir } from 'next/dist/lib/find-pages-dir';
import { collectPages, getNamedExports } from 'next/dist/build/utils';
import { defaultConfig, NextConfig } from 'next/dist/server/config-shared';
import { TemplatePage } from '../template/types';
import * as path from 'path';

const defaultPageExt = defaultConfig.pageExtensions ?? [];

const brailExtensions: string[] = [
  'template.tsx',
  'template.ts',
  'template.jsx',
  'template.js',
];

export const registerHandlers = async () => {
  const dir = getProjectDir();
  const pagesDir = findPagesDir(dir);
  console.log('Pages dir', pagesDir);

  const templatePaths = await collectPages(pagesDir, brailExtensions);

  for (const templatePath of templatePaths) {
    const fullPath = path.join(pagesDir, templatePath);
    
    // const template: TemplatePage<any> = require(fullPath);

    // console.log(template);
  }
};

/** TODO: Not currently operational due to Module error */
// When importing via both require(...) in next.config.js
// and via import .. from .. elsewhere, an error is thrown
// saying cannot not import outside of a module.
// Not sure how to fix
export const withBrail = (config: NextConfig) => {
  registerHandlers();

  // Register brail page extensions
  let exts = config.pageExtensions ?? [];
  exts = [...exts, ...brailExtensions];
  exts = Array.from(new Set(exts));

  return {
    ...config,
    pageExtensions: exts,
  };
};

export default withBrail;
