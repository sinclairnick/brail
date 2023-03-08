export const serverImport = async <T>(path: string) => {
  if (typeof window === "undefined") {
    const imported: T = require(`${path}`);
    return imported;
  }

  return undefined;
};
