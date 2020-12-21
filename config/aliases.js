/**
 * This page contains configurations for module import resolutions.
 * Any changes should be manually reflected to `tsconfig.json` for TypeScript parser.
 */

// Resolve a path to the project root
const resolve = require('./resolve');

// Module alias paths
const aliases = {
  '@components': './src/components',
  '@containers': './src/containers',
  '@contexts': './src/contexts',
  '@helpers': './src/helpers',
  '@hooks': './src/hooks',
  '@pages': './src/pages',
  '@settings': './src/settings',
  '@slices': './src/slices',
  '@themes': './src/themes',
  '@types': './src/types',
  '@vendors': './src/vendors',
};

// for eslint
// https://github.com/johvin/eslint-import-resolver-alias#readme
const eslintAliases = Object.entries(aliases);

// for webpack
const webpackAliases = Object.entries(aliases).reduce(
  (output, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    output[key] = resolve(value);
    return output;
  },
  {},
);

module.exports = {
  aliases,
  eslintAliases,
  webpackAliases,
};
