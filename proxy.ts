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
    target: 'http://localhost:3001',
    changeOrigin: true,
    secure: false,
    wx: true
  },
  css: {
    target: 'http://localhost:3001',
    changeOrigin: true,
    secure: false,
    wx: true
  },
  img: {
    target: 'http://localhost:3001',
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
  },
  '/presale-api': {
    target: javaGatewayLink,
  // TODO: 待删除
  // 本地联调使用
  '/aiAPI': {
    target: 'http://172.18.37.83:6017',
    changeOrigin: true,
    secure: false,
    wx: true
  }
}

module.exports = proxyConfig
