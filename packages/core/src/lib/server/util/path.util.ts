export const stripTrailingSlashes = (path: string) => {
  return path
    .split(/\/+/)
    .filter((x) => x !== undefined && x.length !== 0)
    .join('/');
};
