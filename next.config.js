module.exports = {
  // Fix use of `fs` Node module.
  // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        net: 'empty',
      };
    }
    return config;
  },
};
