import { getProjectDir } from 'next/dist/lib/get-project-dir';
import { findPagesDir } from 'next/dist/lib/find-pages-dir';
import { recursiveReadDir } from 'next/dist/lib/recursive-readdir';
import path from 'path';
import fs from 'fs';
import { parseModule } from 'next/dist/build/analysis/parse-module';
import * as ts from 'typescript';
import { loadComponents } from 'next/dist/server/load-components';

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
  const { pages: pagesDir } = findPagesDir(dir);

  if (pagesDir == null) {
    throw new Error('Failed to find any templates');
  }

  const pagesPaths = await recursiveReadDir(
    pagesDir,
    new RegExp(`\\.(?:${brailExtensions.join('|')})$`)
  );

  for (const templatePath of pagesPaths) {
    const fullPath = path.join(pagesDir, templatePath);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      throw new Error('File does not exist');
    }
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const components = await loadComponents({
      distDir: dir + '/dist',
      hasServerComponents: false,
      isAppPath: false,
      pathname: fullPath,
      serverless: false,
    });
  }
};

// Note: TypeORM has import TS stuff code to learn from
// See: https://github.com/typeorm/typeorm/tree/486f8c582170dbadbd875e00d09d26359b2fd8be/src/util
