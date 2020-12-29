const path = require('path');
const tsConfig = require('./tsconfig');

/** Create module alias map for `eslint-import-resolver-alias` plugin. */
const createAliasArray = () => {
  const {
    compilerOptions: { paths },
  } = tsConfig;
  return Object.keys(paths)
    .filter(key => !/\/\*$/.test(key))
    .reduce((output, key) => {
      const value = paths[key];
      // Remove '/' at the end from the key.
      const alias = key.replace(/\/$/, '');
      // Resolve the path from the root directory.
      const target = path.resolve(process.cwd(), value[0]);
      output.push([alias, target]);
      return output;
    }, []);
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      // eslint-import-resolver-alias
      alias: {
        map: createAliasArray(),
        extensions: ['.js', '.json', '.ts'],
      },
    },
  },
  extends: [
    // eslint (recommended) run by @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/eslint-recommended',
    // @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    // eslint-plugin-import
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // eslint-config-prettier (turn off conflicting rules with prettier)
    // + eslint-plugin-prettier (use prettier as eslint rules)
    'plugin:prettier/recommended',
    // Make eslint-plugin-prettier work with some special plugins
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-redeclare': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        json: 'never',
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    // For JavaScript
    {
      files: ['*.js'],
      extends: [
        // eslint (recommended)
        'eslint:recommended',
        // eslint-config-airbnb
        'airbnb',
        // eslint-plugin-import
        'plugin:import/errors',
        'plugin:import/warnings',
        // eslint-config-prettier (turn off conflicting rules with prettier)
        // + eslint-plugin-prettier (use prettier as eslint rules)
        'plugin:prettier/recommended',
      ],
    },
  ],
};
