import { loadManifest } from './manifest';
import { getNextDir, getRuntimePaths } from './path';

// Taken from the next-sitemap project
// Credit: https://github.com/iamvishnusankar/next-sitemap
export const getNextManifest = async () => {
  const nextDir = getNextDir();
  console.log('NEXT', nextDir);
  // Get runtime paths
  const runtimePaths = getRuntimePaths({
    sourceDir: nextDir,
  });

  console.log('RT', runtimePaths);

  // Load next.js manifest files
  const manifest = await loadManifest(runtimePaths);

  return manifest;
};
