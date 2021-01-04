module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      // eslint-import-resolver-alias
      alias: {
        map: [['~server', './server']],
        extensions: ['.json', '.ts'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    // eslint (recommended) run by @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/eslint-recommended',
    // @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    // eslint-config-airbnb
    'airbnb',
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
    'no-redeclare': 'off',
    'no-restricted-imports': ['error', { patterns: ['../*'] }],
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        enums: false,
        typedefs: false,
      },
    ],
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['schemas/**/*.ts'],
      rules: {
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
