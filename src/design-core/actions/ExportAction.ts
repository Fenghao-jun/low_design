import { ParamsScheme, paramsSchemeToVariable } from '@/utils/params'
import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'
import {
  EventNode,
  excelEventFlow,
  findStatusNode
} from '@core/utils/event-flow'
import { evaluate } from 'amis-formula'
import { checkArgs } from './common'
import request from '@/design/http'

export interface IExportAction extends ListenerAction {
  actionType: 'export'

  args: {
    params?: ParamsScheme[]
    url: string
    method: 'get' | 'post'
  }
}

export class ExportAction implements RendererAction {
  async run(node: EventNode<IExportAction>, eventData, initEventData) {
    try {
      checkArgs(node, 'export')

      const action = node.actionConfig!
      const { url, method, params = [] } = action.args

      const requestParams = paramsSchemeToVariable(params, {
        eventData,
        initEventData
      })
      console.log('requestParams: ', requestParams)

      if (method === 'get') {
        // 直接打开新的页面

        // let fileUrl: string = url
        // fileUrl += '?'
        // const rPrams = { ...eventData, ...initEventData, ...requestParams }
        // const keys = Object.keys(rPrams)
        // for (const key of keys) {
        //   if (rPrams[key] !== undefined && rPrams[key] !== null) {
        //     fileUrl += `${key}=${encodeURIComponent(rPrams[key])}&`
        //   }
        // }

        // console.log('fileUrl: ', fileUrl)
        await request.get({
          url,
          responseType: 'blob',
          data: {
            ...eventData,
            ...initEventData,
            ...requestParams
          },
          params: {
            ...eventData,
            ...initEventData,
            ...requestParams
          }
        })
      } else {
        // 等待流
        const res = await request.post({
          url,
          responseType: 'blob',
          data: {
            ...eventData,
            ...initEventData,
            ...requestParams
          },
          params: {
            ...eventData,
            ...initEventData,
            ...requestParams
          }
        })
      }
    } catch (error) {
      excelEventFlow(
        findStatusNode(node.children, 'error'),
        null,
        initEventData
      )
    }
  }
}
