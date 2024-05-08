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

interface RequestParamsItem {
  key: string
  value: string
  formula?: string
}

interface RequestActionArgs extends ApiConfig {
  params?: RequestParamsItem[]
}

// 请求事件
interface IRequestAction extends ListenerAction {
  actionType: 'request'

  args: RequestActionArgs
}

export class RequestAction implements RendererAction {
  async run(node: EventNode<IRequestAction>, eventData, initEventData) {
    console.log('eventData: ', eventData)
    if (!node.actionConfig) {
      console.error('RequestAction 缺少actionConfig')
      return
    }
    const { params = [] } = node.actionConfig.args
    const requestParams = params.reduce((prev, cur) => {
      if (cur.formula) {
        // 执行公式
        prev[cur.key] = evaluate(cur.formula, { eventData, initEventData })

        return prev
      }
      prev[cur.key] = get({ eventData, initEventData }, cur.value)
      return prev
    }, {})

    console.log('requestParams: ', requestParams)
  }
}
