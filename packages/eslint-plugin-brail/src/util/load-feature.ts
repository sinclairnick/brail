import { Feature, FeatureData } from './can-i-email.types';

export const loadFeature = (feature: Feature): FeatureData => {
  return require(`../../data/features/${feature}.json`);
};
