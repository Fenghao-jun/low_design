import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'
import {
  EventNode,
  excelEventFlow,
  findStatusNode
} from '@core/utils/event-flow'
import { getComponentRef } from '@core/utils/component-ref'
import { evaluate } from 'amis-formula'

// 确认弹窗
interface ICopyAction extends ListenerAction {
  actionType: 'copy'

  args: {
    text?: string
  }
}

export class CpoyAction implements RendererAction {
  async run(node: EventNode<ICopyAction>, eventData, initEventData) {
    try {
      if (!node.actionConfig) {
        console.error('componentAction node.actionConfig is null')
        return
      }

      const action = node.actionConfig
      if (action.actionType === 'copy') {
        // TODO 根据公式和事件参数提取url
        if (!action.args.text) {
          console.error('CopyAction 缺少 text')
          return
        }
        const text = evaluate(action.args.text, { eventData, initEventData })
        console.log('text: ', text)
        await navigator.clipboard.writeText(text)

        excelEventFlow(findStatusNode(node.children), text, initEventData)
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
