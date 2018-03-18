const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const commonConfig = require('./webpack.config.js')

module.exports = merge(commonConfig, {
  plugins: [
    new CleanWebpackPlugin(['www/*.*', 'www/asset/*']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin({
      sourceMap: false,
    })
  ]
})
