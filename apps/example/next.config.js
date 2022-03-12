const { withBrail } = require('@brail/core');

let nextConfig = {
  pageExtensions: ['template.tsx'],
};

nextConfig = withBrail(nextConfig);

module.exports = nextConfig;
