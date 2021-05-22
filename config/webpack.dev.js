const helpers = require('./helpers.js');

/**
 * Webpack Plugins
 */
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

const stage = process.env.STAGE || 'dev';
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
  /**
   * This option tells webpack to use its built-in optimizations accordingly.
   */
  mode: 'development',

  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: helpers.root('dist'),

    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].bundle.js',

    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    sourceMapFilename: '[name].map',

    /** The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
    chunkFilename: '[id].chunk.js',
    publicPath: '/'
  },

  devServer: {
    host: 'localhost',
    port: 4200,
    open: true,
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [new webpack.DefinePlugin(envKeys)]
});
