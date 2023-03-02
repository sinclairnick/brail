export const camelCase = (str: string) => {
  return str.replace(/-([a-zA-Z0-9])/g, (g) => g[1].toUpperCase());
};
