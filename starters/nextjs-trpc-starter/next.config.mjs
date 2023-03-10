import { withBrail } from "brail/next";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

/** @type {import("brail").BrailOptions} */
const brailConfig = {
  templateExtensions: ["template.tsx"],
  emitTemplates: "src/brail/templates.generated.ts",
};

export default withBrail(brailConfig)(config);
