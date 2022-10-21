export const stripeTrailingSlashes = (path: string) => {
  return path
    .split(/\/+/)
    .filter((x) => x !== undefined && x.length !== 0)
    .join('/');
};
