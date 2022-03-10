const withTM = require('next-transpile-modules')([
  '@brail/mjml',
  '@brail/core',
  '@brail/react',
]); // pass the modules you would like to see transpiled

const nextConfig = {};

module.exports = withTM(nextConfig);
