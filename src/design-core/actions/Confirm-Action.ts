import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'
import { EventNode, excelEventFlow } from '@core/utils/event-flow'
import { ElMessageBox } from 'element-plus'
import { checkArgs } from './common'

// 确认弹窗
interface IConfirmAction extends ListenerAction {
  actionType: 'confirm'

  args: {
    text?: string
  }
}

export class ConfirmAction implements RendererAction {
  async run(node: EventNode<IConfirmAction>, eventData, initEventData) {
    checkArgs(node, 'confirm')

    const args = node.actionConfig?.args
    ElMessageBox({
      title: '提示',
      message: args?.text || '内容',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      showCancelButton: true
    })
      .then((res) => {
        console.log('res: ', res)
        excelEventFlow(
          node.children?.filter((item) => item.eventKey === 'success'),
          eventData,
          initEventData
        )
      })
      .catch((err) => {
        console.log('err: ', err)
        excelEventFlow(
          node.children?.filter((item) => item.eventKey === 'error'),
          eventData,
          initEventData
        )
      })
  }
}
