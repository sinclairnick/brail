/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { IConfig, IRuntimePaths } from '../interface';
import path from 'path';

/**
 * Return all runtime paths
 * @param config
 * @returns
 */
export const getRuntimePaths = (config: IConfig): IRuntimePaths => {
  return {
    BUILD_MANIFEST: path.join(config.sourceDir!, 'build-manifest.json'),
    PRERENDER_MANIFEST: path.join(config.sourceDir!, 'prerender-manifest.json'),
    ROUTES_MANIFEST: path.join(config.sourceDir!, 'routes-manifest.json'),
    EXPORT_MARKER: path.join(config.sourceDir!, 'export-marker.json'),
  };
};

export const getNextDir = (dirName = '.next') => {
  const nextDir = __dirname;

  const parts = nextDir.split('/');
  const dotNextIndex = parts.findIndex((x) => x === dirName);

  if (dotNextIndex === undefined) {
    throw new Error(`Could not find ${dirName} folder`);
  }

  return path.sep + path.join(...parts.slice(0, dotNextIndex + 1));
};
