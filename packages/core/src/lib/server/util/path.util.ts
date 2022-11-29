export const stripTrailingSlashes = (path: string) => {
  return path
    .split(/\/+/)
    .filter((x) => x !== undefined && x.length !== 0)
    .join('/');
};

export const ensureStartingSlash = (path: string) => {
  if (path.startsWith('/')) return path;
  return '/' + path;
};
