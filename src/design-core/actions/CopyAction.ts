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
      checkArgs(node, 'copy')

      const action = node.actionConfig!

      const text = evaluate(action.args.text!, { eventData, initEventData })
      console.log('text: ', text)
      await navigator.clipboard.writeText(text)

      excelEventFlow(findStatusNode(node.children), text, initEventData)
    } catch (error) {
      excelEventFlow(
        findStatusNode(node.children, 'error'),
        null,
        initEventData
      )
    }
  }
}
