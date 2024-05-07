import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'
import {
  EventNode,
  excelEventFlow,
  findStatusNode
} from '@core/utils/event-flow'
import { ElMessage, MessageOptions } from 'element-plus'

// 确认弹窗
interface IMessageAction extends ListenerAction {
  actionType: 'message'

  args: MessageOptions
}

export class MessageAction implements RendererAction {
  async run(node: EventNode<IMessageAction>, render, eventData) {
    try {
      if (!node.actionConfig) {
        console.error('MessageAction 缺少actionConfig')
        return
      }

      const args = node.actionConfig.args || {}

      ElMessage({
        type: args.type || 'success',
        message: args.message || '消息',
        ...args
      })

      excelEventFlow(findStatusNode(node.children, 'success'))
    } catch (error) {
      excelEventFlow(findStatusNode(node.children, 'error'))
    }
  }
}
