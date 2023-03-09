await import("zx/globals");
import { program } from "commander";

program.name("create-brail-app").version("0.0.1");

const GH_REPO =
  "https://github.com/sinclairnick/brail/tree/develop/starters/nextjs-trpc-starter";

program
  .argument("[dirName]", "Directory name", ".")
  .option("--use-pnpm", "Use pnpm")
  .option("--use-npm", "Use npm")
  .action((dirName, opts) => {
    if (opts.useNpm) {
      $`npx create-next-app ${dirName} --example "${GH_REPO}"`;
    } else if (opts.usePnpm) {
      $`pnpx create next-app ${dirName} --example "${GH_REPO}"`;
    } else {
      $`yarn create next-app ${dirName} --example "${GH_REPO}"`;
    }
  });

program.parse(process.argv);
