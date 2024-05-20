const isProd = process.env.NODE_ENV === 'production'

exports.demoRemoteUrl = isProd ?'demo@https://cdn.dataso.cn/static/remote-components/demo-vue-cli/demoComponentEntry.js' : 'demo@http://localhost:3001/demoComponentEntry.js'
// exports.shopRemoteUrl = isProd ?'shop@https://test-topaz-theta-93.vercel.app/entry.js' : 'shop@http://localhost:3001/entry.js'
exports.shopRemoteUrl = isProd ?'shop@https://am-admin-remote-component.dataso.net/packages/shop/dist/entry.js' : 'shop@http://localhost:3001/entry.js'
