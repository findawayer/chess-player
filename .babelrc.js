module.exports = {
  presets: ['next/babel'],
  plugins: [
    // Resolve imports to top level directory for better tree shaking and DX.
    [
      'babel-plugin-transform-imports',
      {
        '@material-ui/core': {
          transform: '@material-ui/core/esm/${member}',
          preventFullImport: true,
        },
        '@material-ui/icons': {
          transform: '@material-ui/icons/esm/${member}',
          preventFullImport: true,
        },
        '@material-ui/lab': {
          transform: '@material-ui/lab/esm/${member}',
          preventFullImport: true,
        },
      },
    ],
    // Support `const enum` in TypeScript.
    [
      'const-enum',
      {
        transform: 'constObject',
      },
    ],
  ],
};
