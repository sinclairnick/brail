export const trimSlashes = (str: string) => {
  return str
    .split(/\/+/)
    .filter((x) => x !== undefined && x.length !== 0)
    .join('/');
};
