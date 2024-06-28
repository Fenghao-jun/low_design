const gatewayLink = 'https://mp-gateway.dataso.net'
const javaGatewayLink = 'http://192.168.81.11:6018/'

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
    target: 'http://192.168.81.11:6018',
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
    changeOrigin: true,
    secure: false,
    wx: true
  },
  '/activity-api': {
    target: javaGatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  },
  '/approval-api': {
    target: javaGatewayLink,
    changeOrigin: true,
    secure: false,
    wx: true
  }
}

module.exports = proxyConfig
