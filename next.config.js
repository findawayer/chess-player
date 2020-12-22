/* eslint-disable prefer-spread */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/**
 * Configuration for next.js. Do NOT use new features not available
 * in the working Node.js version, because this file is not processed
 * by Babel, Webpack or TypeScript.
 */
module.exports = phase => {
  const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    reactStrictMode: isDevelopment,
  };
};
