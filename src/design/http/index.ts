import requestAxios from 'am-admin-http'
import { getCookie } from 'am-polyfill'
console.log(
  'process.env: ',
  process.env.VUE_APP_HTTP_MODE,
  process.env.VUE_APP_HTTP_MODE === 'dev'
)

const request = requestAxios.createAxiosInstance({
  baseURL: process.env.VUE_APP_BASE_API,
  envObj: {
    isDev: process.env.VUE_APP_HTTP_MODE === 'dev',
    isTest: process.env.VUE_APP_HTTP_MODE === 'test',
    isProd: process.env.VUE_APP_HTTP_MODE === 'production'
  },
  setAuthHeaders: () => {
    return {
      tokenType: 'mp_token',
      accessToken: getCookie('mp_token')
    }
  }
})

export const get = request.get
export const post = request.post
export const cancelAllRequest = request.cancelAllRequest
export const deleted = request.deleted
export const put = request.put
export const cancelRequest = request.cancelRequest
export default request
