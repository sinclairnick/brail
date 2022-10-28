/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['template.tsx', 'api.tsx', 'web.tsx'],
};

module.exports = nextConfig;
