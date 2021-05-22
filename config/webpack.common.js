const helpers = require('./helpers.js');

/**
 * Webpack Plugins
 */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map', // https://webpack.js.org/configuration/devtool/
  entry: {
    app: ['@babel/polyfill', './src/index.js'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: helpers.root('dist'),
    filename: '[name].[fullhash].js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.mjs', '.gql', '.graphql'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // Completely disable tag-attribute processing
              // (We're handling image loading on the client side)
              attrs: false, // [':data-src', 'img:src']
              minimize: true,
              removeComments: true,
              collapseWhitespace: false,
              removeAttributeQuotes: false,
              caseSensitive: true,
              minifyJS: true,
              minifyCSS: true,
              customAttrSurround: [
                [/#/, /(?:)/],
                [/\*/, /(?:)/],
                [/\[?\(?/, /(?:)/]
              ],
              customAttrAssign: [/\)?\]?=/]
            }
          }
        ],
        exclude: [helpers.root('public/index.html')]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: ['/node_modules']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: ['/node_modules'],
        use: [
          {
            loader: 'to-string-loader'
          },
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            // loader: 'style-loader'
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {loader: 'resolve-url-loader'},
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules\/(?!(primereact|primeicons|bootstrap)\/).*/,
        use: ['file-loader?name=images/[name].[ext]', 'image-webpack-loader?bypassOnDebug']
      },
      {
        test: /\.svg?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'file-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  },
  optimization: {
    /**
     * Skips the emitting phase whenever there are errors while compiling.
     * This ensures that no erroring assets are emitted.
     * The optimization key has many others options that are set
     * by default depending on your webpack configuration mode (development/production).
     *
     * @see https://webpack.js.org/configuration/optimization/#optimization-noemitonerrors
     */
    noEmitOnErrors: true,
    /**
     * chunks: ‘all’ indicates which chunks will be selected for optimization.
     * Providing all can be particularly powerful,
     * because it means that chunks can be shared even between async and non-async chunks.
     */
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      minSize: 30000,
      maxSize: 500000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
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
          preset: ['default', {discardComments: {removeAll: false}}]
        },
        canPrint: true
      })
    ]
  },
  plugins: [

    /**
     * This plugin will remove/ clean your build folder(s) before building again
     *
     * All files inside webpack's output.path directory will be removed once, but the
     * directory itself will not be. If using webpack 4+'s default configuration,
     * everything under <PROJECT_DIR>/dist/ will be removed.
     * Use cleanOnceBeforeBuildPatterns to override this behavior.
     *
     * During rebuilds, all webpack assets that are not used anymore
     * will be removed automatically.
     *
     * @see https://github.com/johnagan/clean-webpack-plugin
     */
    new CleanWebpackPlugin({
      verbose: true, // Write Logs to Console
      cleanOnceBeforeBuildPatterns: [helpers.root('dist')]
    }),
    /**
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: helpers.root('src/assets/meta'),
          to: helpers.root('dist')
        },
        {
          from: helpers.root('src/assets/images'),
          to: helpers.root('dist/images')
        }
      ]
    }),
    /**
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: helpers.root('public/index.html'),
      filename: 'index.html',
      favicon: helpers.root('public/favicon.ico'),
      inject: 'body'
    }),
    /**
     * Prepare compressed versions of assets to serve them with Content-Encoding
     * @see https://github.com/webpack-contrib/compression-webpack-plugin
     */
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
    /**
     * This plugin extracts CSS into separate files.
     * It creates a CSS file per JS file which contains CSS.
     * It supports On-Demand-Loading of CSS and SourceMaps.
     *
     * @see https://github.com/webpack-contrib/mini-css-extract-plugin
     */
    new MiniCssExtractPlugin({
      filename: 'bundle.[id].[fullhash].css'
    }),
    // To strip all locales except “en”, “es-us” and “en-SG”
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'en-SG']
    })
  ]
};
