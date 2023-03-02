import fs from "node:fs";

export const mkdir = (path: string) => {
  try {
    fs.mkdirSync(path, { recursive: true });
  } catch (e) {
    return;
  }
};
