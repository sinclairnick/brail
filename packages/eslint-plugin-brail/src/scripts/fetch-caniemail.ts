import { CanIEmailData } from '../util/can-i-email.types';
import fs from 'node:fs/promises';
import fetch from 'node-fetch';
import path from 'path';

const CANIEMAIL_URL = 'https://www.caniemail.com/api/data.json';
const ROOT_DIR = 'data';
const META_OUTFILE = path.join(ROOT_DIR, 'meta.json');
const FEATURE_OUTDIR = path.join(ROOT_DIR, 'features');

const main = async () => {
  const res = await fetch(CANIEMAIL_URL, { method: 'GET' });
  const json = (await res.json()) as CanIEmailData;

  try {
    await fs.readdir(ROOT_DIR);
  } catch (e) {
    console.info('Creating root dir', ROOT_DIR);
    await fs.mkdir(ROOT_DIR);
  }

  try {
    await fs.readdir(FEATURE_OUTDIR);
    console.info('Creating feature dir', FEATURE_OUTDIR);
  } catch (e) {
    await fs.mkdir(FEATURE_OUTDIR);
  }

  const meta: Omit<CanIEmailData, 'data'> = {
    api_version: json.api_version,
    last_update_date: json.last_update_date,
    nicenames: json.nicenames,
  };

  const promises: Promise<unknown>[] = [];

  console.info('Creating meta file', META_OUTFILE);
  promises.push(fs.writeFile(META_OUTFILE, JSON.stringify(meta), 'utf-8'));

  for (const feature of json.data) {
    const outFile = path.join(FEATURE_OUTDIR, `${feature.slug}.json`);
    console.info('Creating feature file', outFile);
    promises.push(fs.writeFile(outFile, JSON.stringify(feature), 'utf-8'));
  }

  await Promise.all(promises);

  console.log('All files saved to', ROOT_DIR);
};

main();
