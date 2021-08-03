/* eslint-disable */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist/develop')
  },
  devtool: 'source-map',
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/develop'),
    port: 8081,
    open: true,
    hot: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ 
        from: path.resolve(__dirname, '../assets/'),
        to: './assets',
        force: true
      }]
    }, { copyUnmodified: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: true
    }), 
    new MiniCSSExtractPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '#': path.resolve(__dirname, '../'),
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.components\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader']
      }
    ]
  }
}