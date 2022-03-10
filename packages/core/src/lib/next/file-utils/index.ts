import fs from 'fs/promises';

/**
 * Load file
 * @param path
 * @param throwError
 * @returns
 */
export const loadJson = async <T>(
  path: string,
  throwError = true
): Promise<T | undefined> => {
  // Get path stat
  try {
    const stat = await fs.stat(path);

    // Import and return if the file exist
    if (stat.isFile()) {
      const data = await fs.readFile(path, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    // Handle error
    if (throwError) {
      throw new Error(`${path} does not exist.`);
    }
  }

  return undefined;
};
