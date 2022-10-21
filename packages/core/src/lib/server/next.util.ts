import { getProjectDir } from 'next/dist/lib/get-project-dir';
import { findPagesDir } from 'next/dist/lib/find-pages-dir';
import { getNamedExports } from 'next/dist/build/utils';
import { defaultConfig, NextConfig } from 'next/dist/server/config-shared';
import { loadComponents } from 'next/dist/server/load-components';
import * as path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import { pathToFileURL } from 'url';

export const brailExtensions: string[] = [
  'template.tsx',
  'template.ts',
  'template.jsx',
  'template.js',
];

// TODO: Integrate template with Next pages
// Future feature
export const collectExportedHandlers = async () => {
  const dir = getProjectDir();
  const pagesDir = findPagesDir(dir);
  // const pagesRelative = pagesDir.replace(dir, '');

  // const templatePaths = await collectPages(pagesDir, brailExtensions);
  // console.log('Dir', dir);
  // console.log('Pages dir', pagesDir);
  // console.log('Pages rel', pagesRelative);
  // console.log('Dirname', __dirname);
  // console.log('CWD', process.cwd());
  // console.log('Template paths', templatePaths);

  // for (const templatePath of templatePaths) {
  // const fullPath = path.join(pagesDir, templatePath);
  // const relPath = path.join(pagesRelative, templatePath);
  // const fstat = fs.statSync(fullPath);
  // const fileExists = fstat.isFile();
  // const mod = require('./' + relPath);
  // console.log(mod);
  // }
};

// Note: TypeORM has import TS stuff code to learn from
// See: https://github.com/typeorm/typeorm/tree/486f8c582170dbadbd875e00d09d26359b2fd8be/src/util
