import { ApiConfig } from '@/design-core/types'
import { normalRequest } from '@/design/api'
import request from '../http'
import { CustomRequestConfig } from 'am-admin-http'

export function useApi(params: ApiConfig) {
  const requestAction = async (
    config: CustomRequestConfig<AnyObject, AnyObject>
  ) => {
    return params.type === 'normal'
      ? normalRequest(config)
      : request[params.method](config)
  }

  return {
    requestAction
  }
}
