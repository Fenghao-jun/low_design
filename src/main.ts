// import('./bootstrap')
// import * as config from './bootstrap'

import './public-path'
const promise = import('./bootstrap')

export const bootstrap = () => promise.then((m) => m.bootstrap())
export const mount = (config) => promise.then((m) => m.mount(config))
export const unmount = () => promise.then((m) => m.unmount())

// console.log('config: ', config)

// export {
//   mount:config.mount
// }
