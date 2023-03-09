import withBrail from "brail/next";

/** @type {import("brail").BrailOptions} */
const brailConfig = {
  templateExtensions: ["template.tsx"],
  emitTemplates: true,
};

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts"],
};

export default withBrail(brailConfig)(nextConfig);
