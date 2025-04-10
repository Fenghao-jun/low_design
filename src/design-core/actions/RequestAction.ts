import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'
import {
  EventNode,
  excelEventFlow,
  findStatusNode
} from '@core/utils/event-flow'
import { ApiConfig } from '../types'
import { get } from 'lodash-es'
import { evaluate } from 'amis-formula'
import { useApi } from '@design/hooks/useApi'
import { checkArgs } from './common'
import { usePageDataStore } from '../store/page-data'

interface RequestParamsItem {
  key: string
  value: string
  formula?: string
}

export interface RequestActionArgs extends ApiConfig {
  params?: RequestParamsItem[]
}

// 请求事件
interface IRequestAction extends ListenerAction {
  actionType: 'request'

  args: RequestActionArgs
}

function getAllPageData() {
  return usePageDataStore().getData()
}

export class RequestAction implements RendererAction {
  async run(node: EventNode<IRequestAction>, eventData, initEventData) {
    try {
      checkArgs(node, 'request')

      const { params = [] } = node.actionConfig!.args
      const mergeData = {
        eventData,
        initEventData,
        pageData: getAllPageData()
      }
      console.log('mergeData: ', mergeData)

      // 如果传进来是对象， 则帮他解构
      const baseData =
        Object.prototype.toString.call(eventData) === '[object Object]'
          ? { ...eventData }
          : {}

      const requestParams = params.reduce((prev, cur) => {
        if (cur.formula) {
          // 执行公式
          prev[cur.key] = evaluate(cur.formula, mergeData)

          return prev
        }
        prev[cur.key] = get(mergeData, cur.value)
        return prev
      }, baseData)

      const { requestAction } = useApi(node.actionConfig!.args)

      const res = await requestAction({
        url: node.actionConfig!.args.url,
        data: requestParams
      })

      console.log('res: ', res)

      excelEventFlow(findStatusNode(node.children), res.data, initEventData)
    } catch (error) {
      console.log('error: ', error)
      excelEventFlow(
        findStatusNode(findStatusNode(node.children, 'error'), 'error'),
        null,
        initEventData
      )
    }
  }
}
