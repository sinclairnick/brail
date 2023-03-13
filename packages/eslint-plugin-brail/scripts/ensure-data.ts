import "zx/globals";
import { fetchData } from "../src/util/fetch/fetch-caniemail-data";
import { hasFeatureDir, hasRootDir, listRootDir } from "../src/util/fetch/util";

const run = async () => {
  const [hasRoot, hasFeature] = await Promise.all([
    hasRootDir(),
    hasFeatureDir(),
  ]);

  if (!hasRoot || !hasFeature) {
    await fetchData();
    return;
  }

  const rootFiles = await listRootDir();
  if (rootFiles.length === 0) {
    await fetchData();
    return;
  }

  const featureFiles = await listRootDir();
  if (featureFiles.length === 0) {
    await fetchData();
    return;
  }

  console.log("Data already exists. Skipping fetch.");
};

run();
