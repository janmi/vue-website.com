var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = true;
// process.env.NODE_ENV = "dev";
var debug = process.env.NODE_ENV !== 'production';
var CDN = 'static/'; //配置静态文件域名

module.exports = merge(baseConfig, {
  devtool: SOURCE_MAP ? '#source-map' : false,
  output: {
    // naming output files with hashes for better caching.
    // dist/index.html will be auto-generated with correct URLs.
    publicPath: debug ? 'static/' : CDN, 
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: SOURCE_MAP,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin('css/[name].[contenthash].css'),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ]
})
