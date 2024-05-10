import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'

import { evaluate } from 'amis-formula'
import {
  EventNode,
  excelEventFlow,
  findStatusNode
} from '@core/utils/event-flow'
import { checkArgs } from './common'

// 跳转动作
interface ILinkAction extends ListenerAction {
  actionType: 'link'

  args: {
    // 跳转地址 可以传入amis公式
    url?: string
    // 是否新窗口打开
    blank?: boolean
  }
}

export class LinkAction implements RendererAction {
  async run(node: EventNode<ILinkAction>, eventData, initEventData) {
    try {
      checkArgs(node, 'link')

      const path = evaluate(node.actionConfig?.args.url as string, {
        eventData,
        initEventData
      })

      if (node.actionConfig?.args.blank) {
        window.open(path)
      } else {
        window.location.href = path
      }
      excelEventFlow(findStatusNode(node.children), path, initEventData)
    } catch (error) {
      console.log('error: ', error)
      excelEventFlow(
        findStatusNode(node.children, 'error'),
        null,
        initEventData
      )
    }
  }
}
