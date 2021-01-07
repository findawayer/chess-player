/**
 * Next.js & TypeGraphQL project configuration.
 * Original code from: https://github.com/egoist/next-fullstack-starter/blob/master/next.config.js
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  webpack(config) {
    // Test folders are not automatically ignored.
    // issue: https://github.com/vercel/next.js/issues/1914
    // issue: https://github.com/vercel/next.js/discussions/11113
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
