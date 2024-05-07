import { ListenerAction } from '@core/utils/componentActionCenter/Action'
import actionRegisterCenter from '@core/utils/componentActionCenter/action-regiter'

type NodeType = 'action' | 'event'

type EventKey = 'success' | 'error'

export interface EventNode<T = ListenerAction> {
  /**
   * 判断这个节点是事件还是动作
   */
  key: NodeType

  /**
   * 动作配置
   */
  actionConfig?: T

  /**
   * @description 当EventNode为事件时，children是一个属于这个事件的子节点事件流
   * @description 当EventNode为动作时，children是一个属于这个动作结果的事件流
   */
  children?: EventNode[]

  eventKey?: EventKey
}

export interface ComponentEvent {
  [key: string]: EventNode[]
}

export function findStatusNode(nodes: EventNode[] = [], status = 'success') {
  if (!nodes.length) {
    return []
  }

  return nodes.filter((item) => item.eventKey === status)
}

export function excelEventFlow(nodes: EventNode[] = []) {
  if (!nodes.length) {
    return
  }

  nodes.forEach((node) => {
    if (node.key === 'action') {
      // 执行动作
      console.log('action')
      if (!node.actionConfig?.actionType) {
        console.error('actionType is undefined')
        return
      }
      const actionInstance = actionRegisterCenter.getAction(
        node.actionConfig?.actionType
      )

      if (!actionInstance) {
        console.error(
          'actionInstance：',
          node.actionConfig.actionType,
          ' is undefined'
        )
        return
      }

      actionInstance.run(node, '')
    } else if (node.key === 'event') {
      // 如果是事件，则执行事件下的子节点事件流
      excelEventFlow(node.children)
    }
  })
}
