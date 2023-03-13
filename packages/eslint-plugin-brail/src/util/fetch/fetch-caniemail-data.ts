import fs from "node:fs/promises";
import fetch from "node-fetch";
import path from "path";
import { CanIEmailData } from "../can-i-email.types";
import {
  createFeatureDir,
  createRootDir,
  getFeatureDir,
  getRootDir,
  hasFeatureDir,
  hasRootDir,
} from "./util";

const CANIEMAIL_URL = "https://www.caniemail.com/api/data.json";
const META_OUTFILE = path.join(getRootDir(), "meta.json");

export const fetchData = async () => {
  const res = await fetch(CANIEMAIL_URL, { method: "GET" });
  const json = (await res.json()) as CanIEmailData;

  if (!(await hasRootDir())) {
    await createRootDir();
  }

  if (!(await hasFeatureDir())) {
    await createFeatureDir();
  }

  const meta: Omit<CanIEmailData, "data"> = {
    api_version: json.api_version,
    last_update_date: json.last_update_date,
    nicenames: json.nicenames,
  };

  const promises: Promise<unknown>[] = [];

  console.info("Creating meta file", META_OUTFILE);
  promises.push(fs.writeFile(META_OUTFILE, JSON.stringify(meta), "utf-8"));

  for (const feature of json.data) {
    const outFile = path.join(getFeatureDir(), `${feature.slug}.json`);
    console.info("Creating feature file", outFile);
    promises.push(fs.writeFile(outFile, JSON.stringify(feature), "utf-8"));
  }

  await Promise.all(promises);

  console.log("All files saved to", getRootDir());
};
