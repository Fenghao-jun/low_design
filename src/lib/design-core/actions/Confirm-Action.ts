import {
  ListenerAction,
  RendererAction
} from '@core/utils/componentActionCenter/Action'
import { EventNode, excelEventFlow } from '@core/utils/event-flow'
import { ElMessageBox, ElMessageBoxOptions } from 'element-plus'
import { checkArgs } from './common'
import { usePageDataStore } from '@/design-core/store/page-data'
import { evaluate } from 'amis-formula'
const store = usePageDataStore()
// 确认弹窗

interface ConfirmActionArgs extends ElMessageBoxOptions {
  text?: string
}

interface IConfirmAction extends ListenerAction {
  actionType: 'confirm'

  args: ConfirmActionArgs
}

export class ConfirmAction implements RendererAction {
  async run(node: EventNode<IConfirmAction>, eventData, initEventData) {
    checkArgs(node, 'confirm')

    const args = node.actionConfig?.args
    ElMessageBox({
      title: '提示',
      message:
        evaluate(args!.text!, {
          eventData,
          initEventData,
          pageData: store.pageData
        }) || '内容',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      showCancelButton: true,
      ...args
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
