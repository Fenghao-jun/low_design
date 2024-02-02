import Request, { RequestConfig } from './request'

import { ResultData } from './request/interface'
import {
  defaultConfig,
  defaultRequestInterceptors,
  defaultResponseInterceptors,
  defaultResponseErrorInterceptors
} from './defaultConfig'

export const PATH_URL = process.env.VUE_APP_BASE_API

// 重写返回类型
interface CustomRequestConfig<D, T> extends RequestConfig<ResultData<T>> {
  data?: D
}

const publicRequest = new Request({
  baseURL: PATH_URL,
  ...defaultConfig,
  interceptors: {
    // 自定义默认请求拦截器
    requestInterceptors: defaultRequestInterceptors,
    // 自定义默认响应拦截器
    responseInterceptors: defaultResponseInterceptors,
    responseInterceptorsCatch: defaultResponseErrorInterceptors
  }
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {CustomRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const commonRequest = <D = any, T = any>(config: CustomRequestConfig<D, T>) => {
  const { method = 'GET', headersType, REJECTERRORCONFIG } = config
  console.log('commonRequest: ', config)

  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return publicRequest.request<ResultData<T>>({
    REJECTERRORCONFIG,
    headers: {
      'Content-Type': headersType || defaultConfig.defaultHeaders
    },
    ...config
  })
}

export const get = <D = any, T = any>(
  config: CustomRequestConfig<D, T>
): Promise<ResultData<T>> => {
  return commonRequest({
    method: 'get',
    ...config
  })
}

export const post = <D = any, T = any>(
  config: CustomRequestConfig<D, T>
): Promise<ResultData<T>> => {
  return commonRequest({
    method: 'post',
    ...config
  })
}

export const put = <D = any, T = any>(
  config: CustomRequestConfig<D, T>
): Promise<ResultData<T>> => {
  return commonRequest({
    method: 'put',
    ...config
  })
}

export const deleted = <D = any, T = any>(
  config: CustomRequestConfig<D, T>
): Promise<ResultData<T>> => {
  return commonRequest({
    method: 'delete',
    ...config
  })
}

// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return publicRequest.cancelRequest(url)
}

// 取消全部请求
export const cancelAllRequest = () => {
  return publicRequest.cancelAllRequest()
}

export default {
  get,
  post,
  put,
  deleted
}
