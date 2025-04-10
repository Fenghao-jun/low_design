import { ApiConfig } from '@/design-core/types'
import { normalRequest } from '@/design/api'
import request from '../http'

export function useApi(params: ApiConfig) {
  const requestAction = async (config: Record<string, any>) => {
    return params.type === 'normal'
      ? await normalRequest(config)
      : await request[params.method](config as any)
  }

  return {
    requestAction
  }
}
