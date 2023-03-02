import meta from '../../data/meta.json';
import {
  CanIEmailData,
  Category,
  Family,
  Platform,
  Support,
} from './can-i-email.types';

const _meta: Omit<CanIEmailData, 'data'> = meta as any;

export const getMeta = () => {
  return meta;
};

export const toReadableFamily = (family: Family) => {
  return _meta.nicenames.family[family];
};

export const toReadablePlatform = (platform: Platform) => {
  return _meta.nicenames.platform[platform];
};

export const toReadableSupport = (support: Support) => {
  return _meta.nicenames.support[support];
};

export const toReadableCategory = (category: Category) => {
  return _meta.nicenames.category[category];
};
