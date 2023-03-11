import "zx/globals";

const baseConfig = {
  author: {
    name: "Nick Sinclair",
    url: "https://github.com/sinclairnick",
  },
  keywords: [
    "brail",
    "email",
    "react",
    "trpc",
    "api",
    "html",
    "responsive",
    "mjml",
  ],
  license: "Apache-2.0",
  repository: { type: "git", url: "https://github.com/sinclairnick/brail" },
};

const paths = await glob("packages/*/package.json");

const promises = paths.map(async (path) => {
  const content = await fs.readFile(path, "utf8");
  const json = JSON.parse(content) as Record<string, any>;
  const newContent = JSON.stringify({ ...json, ...baseConfig }, null, 2);
  console.log(
    chalk.blue(`Writing new package.json to`),
    chalk.green.bold(path)
  );
  await fs.writeFile(path, newContent);
});

await Promise.all(promises);
