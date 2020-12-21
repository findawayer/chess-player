module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    // Support `const enum` in TypeScript; `const enum` can replace `enum` in case to:
    // 1. Suppress verbose output.
    // 2. Make enum values serializable after compilation.
    [
      "const-enum",
      {
        "transform": "constObject"
      }
    ]
  ]
};
