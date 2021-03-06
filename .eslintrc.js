const aliases = require('./aliases').eslint;

const baseRules = {
  'no-console': 'off',
  'no-param-reassign': 'off',
  'no-shadow': 'off',
  'no-undef': 'off',
  'no-underscore-dangle': 'off',
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  'import/prefer-default-export': 'off',
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      // eslint-import-resolver-alias
      alias: {
        map: aliases,
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
      },
    },
  },
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
  rules: baseRules,
  // Plugins are extended per language, because there is no way to remove extended plugins.
  overrides: [
    // For TypeScript
    {
      files: ['*.ts', '*tsx'],
      globals: {
        JSX: 'readonly',
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
      extends: [
        // eslint (recommended) run by @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/eslint-recommended',
        // @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',
        // eslint-plugin-react
        'plugin:react/recommended',
        // eslint-plugin-react-hooks
        'plugin:react-hooks/recommended',
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
        'prettier/react',
      ],
      rules: {
        ...baseRules,
        'no-redeclare': 'off',
        'no-restricted-imports': [
          'error',
          {
            // Material UI: https://material-ui.com/guides/minimizing-bundle-size/
            patterns: [
              '@material-ui/*/*/*',
              '!@material-ui/core/test-utils/*',
              '../*',
            ],
          },
        ],
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
        // Next.js <Link /> contains <a /> without href, and this rule does not allow it.
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['.tsx', '.jsx'] },
        ],
        'react/jsx-props-no-spreading': 'off',
        // Next.js automatically imports React
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/self-closing-comp': 'error',
      },
    },
  ],
};
