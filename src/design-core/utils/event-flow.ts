import { ListenerAction } from '@core/utils/componentActionCenter/Action'
import actionRegisterCenter from '@core/utils/componentActionCenter/action-regiter'

type EventKey = 'action' | 'event'

export interface EventNode<T = ListenerAction> {
  /**
   * 判断这个节点是事件还是动作
   */
  key: EventKey

  /**
   * 动作配置
   */
  actionConfig?: T

  /**
   * @description 当EventNode为事件时，children是一个属于这个事件的子节点事件流
   * @description 当EventNode为动作时，children是一个属于这个动作结果的事件流
   */
  children?: EventNode[]
}

export interface ComponentEvent {
  [key: string]: EventNode[]
}

export function excelEventFlow(nodes: EventNode[] = []) {
  if (!nodes.length) {
    return
  }

  nodes.forEach((node) => {
    if (node.key === 'action') {
      // 执行动作
    } else if (node.key === 'event') {
      // 如果是事件，则执行事件下的子节点事件流
      excelEventFlow(node.children)
    }
  })
}
