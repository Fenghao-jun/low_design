import requestAxios from 'am-admin-http'
import { getCookie } from 'am-polyfill'
import { ElNotification } from 'element-plus'
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
  },
  interceptors: {
    responseInterceptors(response) {
      if (response?.config?.responseType === 'blob') {
        // 如果是文件流，直接过
        // 如果是文件流，直接过
        console.log('response: ', response)

        const desc = response.headers['content-disposition']
        console.log('desc: ', desc)

        const decodeFilename = (filename) => {
          // 提取文件名部分并解码
          const decodedFilename = decodeURIComponent(filename.split('=')[1])

          // 将 Unicode 转换为中文字符
          const chineseFilename = decodedFilename.replace(
            /\\u[\dA-F]{4}/gi,
            (match) =>
              String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
          )

          return chineseFilename
        }
        console.log('desc: ', desc)

        if (desc) {
          const url = window.URL.createObjectURL(response.data)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', decodeFilename(desc))
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }
        return response
      } else if (response.data.code * 1 === (0 as number) * 1) {
        return response
      } else if (response.data.status * 1 === (1000 as number) * 1) {
        return response
      } else {
        if (response.REJECTERRORCONFIG || response.config.REJECTERRORCONFIG) {
          return Promise.reject(response)
        }
        ElNotification({
          title: 'Error',
          message: response.data.message || response?.data?.msg || '系统异常',
          type: 'error'
        })
        return Promise.reject(response)
      }
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
