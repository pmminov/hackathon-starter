const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const atImport = require('postcss-import')
const cssnext = require('postcss-cssnext')
const reporter = require('postcss-reporter')

module.exports = {
  entry: [
    './public/components/app/index.js',
    './public/components/app/index.css'
  ],
  output: {
    path: path.join(__dirname, 'public/bundle'),
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
    }, {
      test: /\.(svg|woff2|woff)$/,
      loader: 'url-loader'
    }]
  },
  postcss: function (webpack) {
    return [
      atImport({addDependencyTo: webpack}),
      cssnext,
      reporter({clearMessages: true})
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('bundle.css')
  ]
}
