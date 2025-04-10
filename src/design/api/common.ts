import { AnyObject } from '@/types'
import request from '../http'
import { ComponentScheme, Variable } from '@/design-core/types'

const DESIGN_API = '/design-api'
const NORMAL_REQUEST_URL = `${DESIGN_API}/aiAPI`

export interface PageConfig {
  components: ComponentScheme[]
  service: string
  name: string
  pageData: Variable[]
  pageId: string
}

/**
 * 获取指定页面的配置信息。
 * @param id 页面的唯一标识符，默认为 '2'。
 * @returns 返回一个Promise，该Promise解析为页面配置的详细信息。
 */
export function getPageConfig(id = '2') {
  return request.get({
    url: `${DESIGN_API}/pageConfigurationModel/${id}` // 构造请求的URL
  } as any)
}

/**
 * 发起一个标准的请求
 * @param url 请求的API路径
 * @param data 请求携带的数据
 * @returns 对应url业务的数据
 */
export function normalRequest(config: Record<string, any>) {
  return request.post({
    ...config,
    url: `${NORMAL_REQUEST_URL}${config.url}`
  } as any)
}
