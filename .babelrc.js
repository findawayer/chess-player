module.exports = {
  presets: [
    'next/babel',
  ],
  plugins: [
    // Support `const enum` in TypeScript to:
    // 1. Suppress verbose compilation output.
    // 2. Make enum values serializable after compilation.
    [
      "const-enum",
      {
        "transform": "constObject"
      }
    ],
    // Resolve imports to top level directory.
    [
      'babel-plugin-import',
      {
        'libraryName': '@material-ui/core',
        'libraryDirectory': '',
        'camel2DashComponentName': false
      },
      'core'
    ],
    [
      'babel-plugin-import',
      {
        'libraryName': '@material-ui/icons',
        'libraryDirectory': '',
        'camel2DashComponentName': false
      },
      'icons'
    ]
  ]
};
