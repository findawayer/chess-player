/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       // CORS settings for /api/*
  //       source: '/api/:path*',
  //       headers: [
  //         {
  //           key: 'Access-Control-Allow-Credentials',
  //           value: 'true',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET,POST',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value:
  //             'Origin,X-Requested-With,Access-Control-Allow-Origin,Content-Type,Accept',
  //         },
  //       ],
  //     },
  //   ];
  // },
  webpack(config) {
    // Test folders are not automatically ignored.
    // issue: https://github.com/vercel/next.js/issues/1914
    // issue: https://github.com/vercel/next.js/discussions/11113
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
