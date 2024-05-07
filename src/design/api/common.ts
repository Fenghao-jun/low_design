import { AnyObject } from '@/types'
import request from '../http'
import { CustomRequestConfig } from 'am-admin-http'

const DESIGN_API = '/design-api'
const NORMAL_REQUEST_URL = `${DESIGN_API}/aiAPI`

export function getPageConfig(id = '1787666552664543234') {
  return request.get({ url: `${DESIGN_API}/pageConfigurationModel/${id}` })
}

/**
 * 发起一个标准的请求
 * @param url 请求的API路径
 * @param data 请求携带的数据
 * @returns 对应url业务的数据
 */
export function normalRequest(
  config: CustomRequestConfig<AnyObject, AnyObject>
) {
  return request.post({
    ...config,
    url: `${NORMAL_REQUEST_URL}${config.url}`
  })
}
