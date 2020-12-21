// Import webpack's internal plugins
const webpack = require('webpack');
// HTML processor
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Custom code compressor
const TerserPlugin = require('terser-webpack-plugin');
// Package metadata
const pkg = require('../package.json');
// Module aliases
const { webpackAliases } = require('./aliases');
// Resolve a path to the project root
const resolve = require('./resolve');

// Webpack configurations
module.exports = function createWebpackConfig(env) {
  const isDevelopment = env === 'development';
  const PUBLIC_URL = isDevelopment
    ? undefined
    : (process.env.PUBLIC_URL || pkg.homepage || '').replace(/\/$/, '');

  return {
    // Optimization mode.
    mode: isDevelopment ? 'development' : 'production',
    // Stop bundling on first error encountered.
    bail: !isDevelopment,
    // Read entry point from `main` value of `package.json`
    entry: resolve(pkg.main),
    // Output setup.
    output: {
      // Build directory.
      path: resolve('public'),
      // Where the app is served from.
      publicPath: PUBLIC_URL,
      // Bundle filename. Do not create real files in development mode.
      filename: `static/js/[name].js`,
      // Each chunk name pattern
      chunkFilename: 'static/js/[name].chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.[j|t]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                // Use `./node_modules/.cache/babel-loader/` as result cache
                // to boost build time (provided by `babel-laader`)
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpe?g|ico)$/i,
          exclude: /node_modules/,
          // ?name=[name].[ext] is only necessary to preserve the original file name
          use: 'file-loader?name=[name].[ext]',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: webpackAliases,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // Transform ECMA8 code, while keeping valid ECMA5 code untouched.
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
            },
            output: {
              ecma: 5,
              comments: false,
              // Non ascii characters are not correctly minified.
              ascii_only: true,
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    // Build HTML from the template file
    plugins: [
      // webpack 5^: allow acces to `process` from brwoser.
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      // Generate the HTML file with bundle script injected.
      new HtmlWebpackPlugin({
        inject: true,
        template: resolve('src/pages/template.ejs'),
        templateParameters: {
          PUBLIC_URL,
        },
      }),
    ],
    // Source mapping method.
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : undefined,
    // Compilation log.
    stats: isDevelopment ? 'minimal' : 'normal',
    // Notify large asset sizes.
    performance: {
      hints: isDevelopment ? false : 'warning',
    },
  };
};
