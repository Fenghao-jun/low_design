const gatewayLink = 'https://mp-gateway.dataso.net'
const javaGatewayLink = 'https://dev-dts-gateway.dataso.net'

const proxyConfig = {
  '/pos-api': {
    target: javaGatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  },
  js: {
    target: 'https://fatjun-file.oss-cn-shenzhen.aliyuncs.com/remote-comp/',
    changeOrigin: true,
    secure: false,
    wx: true
  },
  css: {
    target: 'https://fatjun-file.oss-cn-shenzhen.aliyuncs.com/remote-comp/',
    changeOrigin: true,
    secure: false,
    wx: true
  },
  img: {
    target: 'https://fatjun-file.oss-cn-shenzhen.aliyuncs.com/remote-comp/',
    changeOrigin: true,
    secure: false,
    wx: true
  },
  '/member-api': {
    target: javaGatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  },
  '/oss-api': {
    target: javaGatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  },
  '/franchisee-api': {
    target: gatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  },
  '/brand-api': {
    target: javaGatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  },
  '/php-ysjmart-mp/ysjmart/api': {
    target: gatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  },
  '/design-api': {
    target: javaGatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  }
}

module.exports = proxyConfig
