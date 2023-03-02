import { Family, FeatureData, Platform } from './can-i-email.types';

export type UnsupportedMap = { [family in Family]?: Platform[] };

/**
 * Get unsupported family-platform combinations, using the most recent version
 * @param feature
 */
export const getUnsupportedFamilies = (feature: FeatureData) => {
  const unsupported: UnsupportedMap = {};

  for (const _family in feature.stats) {
    const family = _family as Family;
    const platforms = feature.stats[family];

    for (const _platform in platforms) {
      const platform = _platform as Platform;
      const versions = platforms[platform];
      if (!versions) continue;
      const [latest] = Object.values(versions).reverse();
      if (latest === 'y') continue;
      unsupported[family] = [...(unsupported[family] || []), platform];
    }
  }

  return unsupported;
};

export const scoreSupport = (feature: FeatureData) => {
  let fullSupportCount = 0;
  let partialSupportCount = 0;
  let noSupportCount = 0;

  const flattened = Object.values(feature.stats)
    .map((x) =>
      Object.values(x)
        .map((y) => Object.values(y))
        .flat()
    )
    .flat();

  for (const result of flattened) {
    if (result === 'y') {
      fullSupportCount++;
      continue;
    }
    if (result === 'n') {
      noSupportCount++;
      continue;
    }
    partialSupportCount++;
  }

  return (
    (fullSupportCount + 0.5 * partialSupportCount) /
    (fullSupportCount + partialSupportCount + noSupportCount)
  );
};

/**
 * Creates a markdown string of email support per family/platform
 */
export const getSupportMarkdown = (feature: FeatureData) => {
  const familyValues = Object.values(Family.Values);
  const header = `${familyValues.map((x) => `| ${x}`).join('')} |`;
  const divider = `${familyValues.map((x) => `| ---`).join('')} |`;

  let body = ``;

  for (const family of familyValues) {
    const platforms = feature.stats[family];
    const platformValues = Object.values(Platform.Values);
    const support = platformValues.map((platform) => {
      const versions = platforms?.[platform];
      if (!versions) return 'n/a';
      const [latest] = Object.values(versions).reverse();
      return latest === 'y' ? '✅' : '❌';
    });
    body += `| ${support.join(' | ')} |`;
  }

  return `${header}\n` + `${divider}\n` + `${body}\n`;
};
