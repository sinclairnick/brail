import { HOSTNAME } from './env';

// Enforce absolute URLs so they work in email clients
export const getAbsoluteSrc = (src: string) => {
  return src.startsWith('/') ? `${HOSTNAME}${src}` : src;
};
