'use strict'
const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const antdTheme = require('./antdTheme')
const autoprefixer = require('autoprefixer')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')

// 定义css自动添加前缀
const postcssConfig = {
  ident: 'postcss',
  plugins: () => [
    autoprefixer()
  ]
}

// 项目访问端口
const port = 8888

module.exports = merge(
  baseWebpackConfig,
  {
    // 服务配置
    devServer: {
      hot: true,
      // hotOnly: true,
      // open: true,
      port: port, // 服务端口
      inline: true,
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
        {
          test: /\.(js|jsx)$/i,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            configFile: './.eslintrc'
          },
          exclude: /(node_modules|bower_components)/
        },
        // 解析less代码
        {
          test: /\.(less|css)$/i,
          use: [
            'style-loader',
            'css-loader',
            { loader: 'postcss-loader', options: postcssConfig },
            { loader: 'less-loader', options: { modifyVars: antdTheme} },
          ]
        }
      ]
    },
    plugins: [
      // 美化 console 输出
      new webpack.NamedModulesPlugin(),
      // 开启全局的模块热替换（HMR）
      new webpack.HotModuleReplacementPlugin(),
      // 编译完成在再浏览器打开项目
      new OpenBrowserPlugin({ url: `http://localhost:${port}` })
    ]
  }
)

