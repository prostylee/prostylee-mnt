/**
 * The webpack configuration that we will use for production mode only
 */
const common = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const stage = process.env.STAGE || 'dev';
console.log(`BUILD STAGE: ${stage}`);
const dotenv = require('dotenv').config({
  path: `.env.${stage}`
});
const env = dotenv.parsed;
// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(common, {
  devtool: false,
  /**
   * This option tells webpack to use its built-in optimizations accordingly.
   */
  mode: 'production',

  optimization: {
    /**
     * chunks: ‘all’ indicates which chunks will be selected for optimization.
     * Providing all can be particularly powerful,
     * because it means that chunks can be shared even between async and non-async chunks.
     */
    splitChunks: {
      chunks: 'all',
      name: false
    },
    /**
     * Imported modules are initialized for each runtime chunk separately.
     * As webpack suggests, while working on a project with multiple entry points
     * you want to have only one runtime instance. For that you need to set it to ‘single’.
     */
    runtimeChunk: 'single',
    minimizer: [
      /**
       * Prepare compressed versions of assets to serve them with Content-Encoding
       * @see https://github.com/webpack-contrib/compression-webpack-plugin
       */
      new CompressionPlugin({
        test: /\.js$|\.css$|\.html$/,
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8,
        cache: false
      }),
      /**
       * uses uglify-js to minify your JavaScript files.
       * We set cache and parallel properties to true in order to enable file caching
       * and to use multi-process parallel running to improve the build speed.
       * There are more options available and I invite you to learn more about this plugin.
       *
       * @see https://github.com/webpack-contrib/uglifyjs-webpack-plugin
       */
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        sourceMap: true
      }),
      /**
       * OptimizeCSSAssetsPlugin will search for CSS assets during the webpack build
       * and will optimize and minimize it. The CSS processor used for optimization is cssnano.
       * All comments will be removed from our minified CSS and no messages will be print to the console.
       *
       * @see https://github.com/NMFR/optimize-css-assets-webpack-plugin
       */
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          preset: ['default', {discardComments: {removeAll: true}}]
        },
        canPrint: false
      })
    ]
  },
  plugins: [new webpack.DefinePlugin(envKeys)]
});
