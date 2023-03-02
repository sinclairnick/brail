/** @type {import("nextra").NextraConfig} */
const nextraConfig = {
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  defaultShowCopyCode: true,
};

const withNextra = require("nextra")(nextraConfig);

/** @type {import("next").NextConfig} */
let config = {
  reactStrictMode: true,
};

config = withNextra(config);

module.exports = config;
