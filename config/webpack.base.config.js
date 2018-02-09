'use strict'
const {resolve} = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

// 项目访问端口
const port = 8888


module.exports = {
  context: resolve(__dirname, '../src'),
  // 输出配置
  output: {
    // 输出的打包文件
    filename: '[name].js',
    // 输出文件路劲
    path: resolve(__dirname, 'dist'),
    // 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
    publicPath: '/'
  },
  // 服务配置
  devServer: {
    hot: true,
    // hotOnly: true,
    // open: true,
    port: port, // 服务端口
    // 和上文output的"publicPath"值保持一致
    publicPath: '/',
    host: '0.0.0.0',
    disableHostCheck: true, // 解决非本机无法访问
    // 开启服务器的模块热替换（HMR）
    // 开启服务器输出文件的路径
    contentBase: resolve(__dirname, 'src'),
  },
  // 入口配置
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './index.js',
  ],
  module: {
    rules: [
      // 解析ECMAScript代码
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: [
    // 开启全局的模块热替换（HMR）
    new webpack.HotModuleReplacementPlugin(),
    // 美化 console 输出
    new webpack.NamedModulesPlugin(),
    // dist目录下生成html模板文件
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new OpenBrowserPlugin({ url: `http://localhost:${port}` })
  ],
  /******** webpack 解析配置 ********/ 
  resolve: {
    /*** 设置自动解析的扩展 ***/
    extensions: ['.web.js', '.js', '.json', '.jsx', '.less', '.css'],
    /*** 设置路径别名 ***/
    alias: {
      Assets: resolve(__dirname, '../src/assets/'),
      Containers: resolve(__dirname, '../src/containers/'),
      Components: resolve(__dirname, '../src/components/'),
      Stores: resolve(__dirname, '../src/stores/'),
      Utils: resolve(__dirname, '../src/utils/')
    }
  }
}