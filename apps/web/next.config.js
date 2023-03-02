/** @type {import("brail").BrailOptions} */
const brailConfig = {
  templateExtensions: ["template.tsx"],
	emitTemplates: "brail/templates.ts"
};

const withBrail = require("brail/next")(brailConfig);

module.exports = withBrail({
  reactStrictMode: true,
});
