/* eslint-disable import/no-extraneous-dependencies */

// Define environment variables first to help the following code
// create conditional setups based on the environment.
process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = '';

// Import packages and modules.
const ip = require('ip');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const pkg = require('../package.json');
const createWebpackConfig = require('../config/webpack.config');

// Server host configuration.
const host = process.env.HOST || '0.0.0.0';
const port = pkg.config.port || 3000;

// Create webpack config through the config factory.
const devConfig = createWebpackConfig(process.env.NODE_ENV);
// Create server config based on the webpack config created.
const serverConfig = {
  contentBase: devConfig.devServer.contentBase,
  publicPath: devConfig.output.publicPath,
  hot: true,
  disableHostCheck: true,
  stats: {
    colors: true,
    modules: false,
  },
};
// Create both compiler and the dev server.
const compiler = webpack(devConfig);
const devServer = new WebpackDevServer(compiler, serverConfig);

// Run the server.
devServer.listen(port, host, error => {
  // Log any error.
  if (error) {
    console.error(error);
    return;
  }
  // Log with colors for emphasis.
  console.log('\x1b[36m%s\x1b[0m', `Local: http://localhost:${port}`);
  console.log('\x1b[36m%s\x1b[0m', `Remote: http://${ip.address()}:${port}`);
});
