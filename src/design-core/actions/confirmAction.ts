import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'
import { EventNode } from '@core/utils/event-flow'
import { ElMessageBox } from 'element-plus'

// 确认弹窗
interface IConfirmAction extends ListenerAction {
  actionType: 'confirm'

  args: {
    text?: string
  }
}

export class ConfirmAction implements RendererAction {
  async run(action: EventNode<IConfirmAction>, render, eventData) {
    if (!action.actionConfig) {
      console.error('confrimAction 缺少actionConfig')
      return
    }
    const args = action.actionConfig?.args
    ElMessageBox({
      title: '提示',
      message: args?.text,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '执行中...'
        }
      }
    })
  }
}
