const env = process.env.VUE_APP_HTTP_MODE || 'dev'
const testCDN = 'https://am-admin-remote-component.dataso.net'
const prodCDN = 'https://am-admin-remote-component.dataso.cn'
// exports.shopRemoteUrl = isProd ?'shop@https://test-topaz-theta-93.vercel.app/entry.js' : 'shop@http://localhost:3001/entry.js'
// exports.shopRemoteUrl = isProd ?'shop@https://am-admin-remote-component.dataso.net/packages/shop/dist/entry.js' : 'shop@http://localhost:3001/entry.js'
let shopRemoteUrl = ''

switch(env) {
  case 'test':
    shopRemoteUrl = `shop@${testCDN}/packages/shop/dist/entry.js`
    break
  case 'production':
    shopRemoteUrl = `shop@${prodCDN}/packages/shop/dist/entry.js`
    break
  default:
    shopRemoteUrl = 'shop@http://localhost:3001/entry.js'
}


module.exports = {
  shopRemoteUrl
}
