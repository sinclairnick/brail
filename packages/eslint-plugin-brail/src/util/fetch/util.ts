import path from "node:path";
import fs from "node:fs/promises";
import _fs from "node:fs";

const ROOT_DIR = "data";
const FEATURE_OUTDIR = path.join(ROOT_DIR, "features");

export const getRootDir = () => {
  return ROOT_DIR;
};

export const hasRootDir = async () => {
  return _fs.existsSync(ROOT_DIR);
};

export const createRootDir = async () => {
  console.info("Creating root dir", ROOT_DIR);
  await fs.mkdir(ROOT_DIR);
};

export const listRootDir = async () => {
  return await fs.readdir(ROOT_DIR);
};

export const getFeatureDir = () => {
  return FEATURE_OUTDIR;
};

export const hasFeatureDir = async () => {
  return _fs.existsSync(FEATURE_OUTDIR);
};

export const createFeatureDir = async () => {
  console.info("Creating feature dir", FEATURE_OUTDIR);
  await fs.mkdir(FEATURE_OUTDIR);
};

export const listFeatureDir = async () => {
  return await fs.readdir(FEATURE_OUTDIR);
};
