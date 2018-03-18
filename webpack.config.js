const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:  './src/app/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'www')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo App',
      template: './src/index.ejs'
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env', 'babel-preset-react'],
              plugins: ['transform-runtime'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './asset/img/[hash].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
