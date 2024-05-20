const isProd = process.env.NODE_ENV === 'production'

exports.demoRemoteUrl = isProd ?'demo@https://cdn.dataso.cn/static/remote-components/demo-vue-cli/demoComponentEntry.js' : 'demo@http://localhost:3001/demoComponentEntry.js'
// exports.shopRemoteUrl = isProd ?'shop@https://cdn.dataso.cn/static/remote-components/shop/entry.js' : 'shop@http://localhost:3001/entry.js'
exports.shopRemoteUrl = isProd ?'shop@http://localhost:3001/entry.js' : 'shop@http://localhost:3001/entry.js'
