/**
 * Next.js & TypeGraphQL project configuration.
 * Original code from: https://github.com/egoist/next-fullstack-starter/blob/master/next.config.js
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {};

module.exports = withBundleAnalyzer(nextConfig);
