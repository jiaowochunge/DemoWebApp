const webpack = require('webpack')
const merge = require('webpack-merge')

const commonConfig = require('./webpack.config.js')

module.exports = merge.smart(commonConfig, {
  devtool: "source-map",
  devServer: {
    contentBase: './www',
    open: true,
    port: 6010
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})
