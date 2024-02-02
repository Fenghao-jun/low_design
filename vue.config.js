const path = require('path');
const { name } = require('./package')
const { defineConfig } = require('@vue/cli-service')

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 10003,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/pos-api': {
        target: 'https://dev-dts-gateway.dataso.net',
        changeOrigin: true,
        secure: false,
        wx: true
      },
      '/oss-api': {
        target: 'https://dts-gateway.dataso.net',
        changeOrigin: true,
        secure: false,
        wx: true
      },
      '/franchisee-api': {
        target: 'https://dev-dts-gateway.dataso.net',
        changeOrigin: true,
        secure: false,
        wx: true
      }
    }
  },
  configureWebpack: config => {
    // 多核启动编译及内存提升
    const data = config.plugins[8];
    // 进程数量
    data.workersNumber = require('os').cpus().length > 4 ? 4 : require('os').cpus().length;
    // 单个进程最大使用内存
    data.memoryLimit = 8192;
  },
  // configureWebpack: {
  //   output: {
  //     library: `${name}-[name]`,
  //     libraryTarget: 'umd', // 把微应用打包成 umd 库格式
  //     chunkLoadingGlobal: `webpackJsonp_${name}`
  //   }
  // },
  // 多线程打包
  parallel: require('os').cpus().length > 1
})
