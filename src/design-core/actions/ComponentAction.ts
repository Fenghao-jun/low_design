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

// 确认弹窗
interface IComponentAction extends ListenerAction {
  actionType: 'component'

  args: {
    componentId: string
    method: string
  }
}

export class ComponentAction implements RendererAction {
  async run(node: EventNode<IComponentAction>, render, eventData) {
    console.log('321')
    if (!node.actionConfig) {
      console.error('componentAction node.actionConfig is null')
      return
    }

    const { componentId, method } = node.actionConfig.args

    const componentRef = getComponentRef(componentId)

    if (!componentRef) {
      console.error('componentRef not found')
      return
    }

    console.log('componentRef: ', componentRef)

    try {
      const res = await componentRef[method]()
      console.log('res: ', res)
      console.log('componentInstance: ', componentRef)
      excelEventFlow(findStatusNode(node.children, 'success'))
    } catch (error) {
      console.log('error: ', error)
      excelEventFlow(findStatusNode(node.children, 'error'))
    }
  }
}
