module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@brail/eslint-plugin`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
