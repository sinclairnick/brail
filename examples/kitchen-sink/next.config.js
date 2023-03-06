/** @type {import("brail").BrailOptions} */
const brailConfig = {
  templateExtensions: ["template.tsx"],
  emitTemplates: true,
};

const withBrail = require("brail/next")(brailConfig);

module.exports = withBrail({
  reactStrictMode: true,
});
