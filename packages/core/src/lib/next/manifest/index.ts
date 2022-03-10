/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  INextManifest,
  IPreRenderManifest,
  IBuildManifest,
  IRuntimePaths,
  IRoutesManifest,
} from '../interface';
import { loadJson } from '../file-utils';

export const loadManifest = async (
  runtimePaths: IRuntimePaths
): Promise<INextManifest> => {
  // Load build manifest
  const buildManifest = await loadJson<IBuildManifest>(
    runtimePaths.BUILD_MANIFEST
  )!;

  // Throw error if no build manifest exist
  if (!buildManifest) {
    throw new Error(
      'Unable to find build manifest, make sure to build your next project before running next-sitemap command'
    );
  }

  // Load pre-render manifest
  const preRenderManifest = await loadJson<IPreRenderManifest>(
    runtimePaths.PRERENDER_MANIFEST,
    false
  );

  // Load routes manifest
  const routesManifest = await loadJson<IRoutesManifest>(
    runtimePaths.ROUTES_MANIFEST,
    false
  );

  return {
    build: buildManifest,
    preRender: preRenderManifest,
    routes: routesManifest,
  };
};
