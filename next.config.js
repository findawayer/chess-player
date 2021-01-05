/* eslint-disable */
/**
 * Next.js & TypeGraphQL project configuration.
 * Original code from: https://github.com/egoist/next-fullstack-starter/blob/master/next.config.js
 */

const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

class FixServerReloadPlugin {
  /**
   * @param {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise(
      'FixServerReloadPlugin',
      async compilation => {
        const moduleIds = Object.keys(require.cache);
        const TESTS = [/server-dist/, /typeorm/];
        TESTS.forEach(regex => {
          moduleIds.forEach(moduleId => {
            if (regex.test(moduleId)) {
              // console.log(moduleId)
              delete require.cache[moduleId];
            }
          });
        });
      },
    );

    compiler.hooks.afterCompile.tap('FixServerReloadPlugin', compilation => {
      compilation.contextDependencies.add(path.resolve('server-dist'));
    });
  }
}

const nextConfig = {
  webpack(config, { dev }) {
    // Mark `server-dist` folder as external
    const serverDist = path.resolve('server-dist');
    // Note that webpack 5 will change the function signature
    config.externals.push((context, request, callback) => {
      if (request.startsWith('~server/')) {
        // Externalize to a commonjs module using the request path
        return callback(
          null,
          `commonjs ${request.replace('~server', serverDist)}`,
        );
      }

      if (request[0] === '.' && context.includes(serverDist)) {
        return callback(null, `commonjs${path.join(serverDist, request)}`);
      }

      // Continue without externalizing the import
      callback();
    });

    if (dev) {
      config.plugins.push(new FixServerReloadPlugin());
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
