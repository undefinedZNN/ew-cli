'use strict'
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: resolve(__dirname, '../src'),
  // 输出配置
  output: {
    // 输出的打包文件
    filename: '[name].js',
    // 输出文件路劲
    path: resolve(__dirname, '../dist'),
    // 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
    publicPath: '/'
  },
  module: {
    rules: [
      // 解析ECMAScript代码
      {
        test: /\.(js|jsx)$/i,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [
          require.resolve('antd').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
          resolve(__dirname, '../src/assets/svg/') // 2. 自己私人的 svg 存放目录
        ]
      }

    ]
  },
  plugins: [
    // dist目录下生成html模板文件
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ],
  /******** webpack 解析配置 ********/ 
  resolve: {
    /*** 设置自动解析的扩展 ***/
    extensions: ['.web.js', '.js', '.json', '.jsx', '.less', '.css'],
    /*** 设置路径别名 ***/
    alias: {
      '@': resolve(__dirname, '../src/')
    }
  }
}