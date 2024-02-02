import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  CreateAxiosDefaults,
  AxiosRequestConfig
} from 'axios'

export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig
  // 请求拦截报错
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (config: T) => T
  // 响应拦截报错
  responseInterceptorsCatch?: (err: any) => any
}

// 初始化自定义传入的参数
export interface CreateRequestConfig<T = AxiosResponse> extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T>
  code?: number | string;
  defaultHeaders?: string;
  setAuthHeaders?: () => Record<string, any>;
  REJECTERRORCONFIG?: any
}
// 实例化的request自定义传参
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  headersType?: string
  REJECTERRORCONFIG?: any
}
export interface CancelRequestSource {
  [index: string]: () => void
}
