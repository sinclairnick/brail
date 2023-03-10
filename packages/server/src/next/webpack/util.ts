const IGNORED_PATHS = [/^api$/, /^_app$/, /^_document$/, /^_error$/];

export const LANG_FILE_EXTENSIONS = /\.m?[j|t]sx?$/;

export const isIgnored = (fname: string) => {
  return IGNORED_PATHS.some((x) => x.test(fname));
};

export const isValidExtension = (ext: string, extensions: string[]) => {
  return extensions.includes(ext);
};

export const stripExt = (path: string, exts: string[]) => {
  return exts.reduce((acc, ext) => acc.replace(`.${ext}`, ""), path);
};

export const stripLeadingSlash = (path: string) => {
  return path.replace(/\/([a-zA-Z0-9]+)/, "$1");
};

export const extractFileParts = (path: string) => {
  const [_, fname, ext] = /^([\w\s-]+)\.?([\.\w]+)?$/.exec(path) ?? [];
  return { fname, ext };
};

export const stripIndex = (path: string) => {
  return path
    .split("/")
    .filter((x) => x !== "index")
    .join("/");
};
