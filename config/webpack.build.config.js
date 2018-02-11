'use strict'
const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const baseWebpackConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 定义css自动添加前缀
const postcssConfig = {
  ident: 'postcss',
  plugins: () => [
    autoprefixer()
  ]
}

baseWebpackConfig.output.publicPath = './'

module.exports = merge(
  baseWebpackConfig,
  {
    // 入口配置
    entry: [
      'babel-polyfill',
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
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              { loader: 'postcss-loader', options: postcssConfig },
              'less-loader'
            ]
          })
        },
      ]
    },
    plugins: [
      // 样式导出配置
      new ExtractTextPlugin('styles.css'),
    ]
  }
)

