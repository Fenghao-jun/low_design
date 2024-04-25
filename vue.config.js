const proxyConfig = require('./proxy.ts')
const path = require('path')
const { name } = require('./package')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: false,
  devServer: {
    port: 10008,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: proxyConfig
  },
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@component': path.resolve(__dirname, 'src/design/component'),
        '@core': path.resolve(__dirname, 'src/design-core'),
        '@design': path.resolve(__dirname, 'src/design')
      }
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`
    }
  },

  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境下关闭插件，降低占用CPU资源
      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap((options) => {
          options.transpileOnly = true
          return options
        })

      config.plugins.delete('fork-ts-checker')
      config.plugins.delete('eslint')
    }
  },

  // 关闭多线程打包
  parallel: false
})
