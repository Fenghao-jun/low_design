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
    try {
      checkArgs(node, 'request')

      const { params = [] } = node.actionConfig!.args
      const requestParams = params.reduce(
        (prev, cur) => {
          if (cur.formula) {
            // 执行公式
            prev[cur.key] = evaluate(cur.formula, { eventData, initEventData })

            return prev
          }
          prev[cur.key] = get({ eventData, initEventData }, cur.value)
          return prev
        },
        { ...eventData }
      )

      const { requestAction } = useApi(node.actionConfig!.args)

      const res = await requestAction({
        url: node.actionConfig!.args.url,
        data: requestParams
      })

      excelEventFlow(findStatusNode(node.children), res.data, initEventData)
    } catch (error) {
      excelEventFlow(
        findStatusNode(findStatusNode(node.children, 'error'), 'error'),
        null,
        initEventData
      )
    }
  }
}
