import { ElMessage } from 'element-plus'
import qs from 'qs'
import { removeCookie, getCookie } from '@/utils'
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export const defaultConfig = {
  /** 接口请求超时时间 */
  timeout: 1000 * 60 * 1,
  withCredentials: true,
  /** 接口成功返回状态码 */
  code: 0,
  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json',
  /** 设置权限头部 */
  setAuthHeaders: () => {
    return {
      tokenType: 'mp_token',
      accessToken: getCookie('mp_token')
    }
  }
}
// 默认请求拦截
export const defaultRequestInterceptors = (
  config: InternalAxiosRequestConfig
) => {
  if (
    config.method === 'post' &&
    config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data)
  }
  if (config.method === 'get' && config.params) {
    let url = config.url
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== undefined && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    }
    url = url?.substring(0, url?.length - 1)
    config.params = {}
    config.url = url
  }
  return config
}

// 默认响应拦截
export const defaultResponseInterceptors = (response: AxiosResponse & any) => {
  if (response?.config?.responseType === 'blob') {
    // 如果是文件流，直接过
    return response
  } else if (response.data.code * 1 === (defaultConfig.code as number) * 1) {
    return response
  } else {
    if (response.REJECTERRORCONFIG) {
      return Promise.reject(response)
    }
    ElMessage.error(response.data.message || '系统异常')
    return Promise.reject(response)
  }
}

// 默认错误响应拦截
export const defaultResponseErrorInterceptors = (error: any) => {
  console.log('默认错误响应拦截 error: ', error)
  // 判断401会跳登录
  if (
    error.response.status * 1 === 401 &&
    error.response.data.code * 1 === 401 &&
    process.env.NODE_ENV === 'production'
  ) {
    window.location.href =
      process.env.VUE_APP_BASE_DOMAIN + '/index.php/basic/general/index'
    removeCookie('iwide_session')
    return
  }
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    ElMessage.error(error.message || '请求超时，请稍后重试')
    return
  }
  if (error?.config?.REJECTERRORCONFIG) {
    return Promise.reject(error)
  }
  ElMessage.error(error.message || '系统异常')
  return Promise.reject(error)
}
