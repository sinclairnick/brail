export const trimSlashes = (str: string) => {
  return str
    .split(/\/+/g)
    .filter((x) => x === undefined || x.length === 0)
    .join('/');
};
