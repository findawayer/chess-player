/* eslint-disable no-restricted-syntax */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  webpack(config) {
    // Use ts-loader for decorators support
    for (const rule of config.module.rules) {
      if (rule.test && rule.test.test('foo.ts')) {
        rule.use = [].concat(rule.use, {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        });
      }
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
