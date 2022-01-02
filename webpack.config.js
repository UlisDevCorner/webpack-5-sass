// NodeJS modules
const path = require('path');

// Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Access the fields to configure webpack
const pkgVars = require('./package.json');

// Destructure variables from pkgVars.config
const {entry, sourceDir, port} = pkgVars.config;

// Get the script name, how to execute webpack, dev or build
const currentTask = process.env.npm_lifecycle_event;

// Common style configuration
const styleConfig = {
  test: /\.scss$/i,
  use: [
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'autoprefixer'
          ]
        }
      }
    },
    "sass-loader"
  ]
}

// Common webpack configuration
const config = {
  entry: `./${sourceDir}/assets/js/${entry}.js`,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `./${sourceDir}/index.html`
    })
  ],
  module: {
    rules: [
      styleConfig
    ]
  }
};

// Webpack development configuration
if (currentTask === 'dev') {

  // Output for the bundles
  config.output = {
    // optional
    filename: `${entry}.js`,
    path: path.resolve(__dirname, sourceDir),
    assetModuleFilename: './assets/img/[name][ext]'
  };

  // Dev server
  config.devServer = {
    static: {
      directory: path.join(__dirname, sourceDir)
    },
    port
  };

  // Add the style-loader, to add styles to the DOM
  styleConfig.use.unshift('style-loader');

}

// Export the config object
module.exports = config;

