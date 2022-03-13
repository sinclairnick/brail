import { HOSTNAME } from './env';

// Absolute URLs mean 
export const getAbsoluteSrc = (src: string) => {
  return src.startsWith('/') ? `${HOSTNAME}${src}` : src;
};
