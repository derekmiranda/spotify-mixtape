const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const outputPath = path.resolve(__dirname, 'dist')

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    hash: true
  }),
  new CopyWebpackPlugin({
    patterns: [{
      from: path.resolve(__dirname, 'src/assets'),
      to: path.resolve(__dirname, outputPath, 'assets')
    }]
  })
]

if (NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}


module.exports = {
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: outputPath,
    filename: 'app.[hash].js',
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {}
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ttf$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  plugins,
  devServer: {
    host: '0.0.0.0',
    contentBase: outputPath,
    watchOptions: {
      watch: true,
    },
    hot: true
  }
}