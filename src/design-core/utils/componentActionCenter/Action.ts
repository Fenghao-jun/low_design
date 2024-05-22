import { EventNode } from '../event-flow'

export type ActionType =
  | 'link'
  | 'confirm'
  | 'message'
  | 'component'
  | 'request'
  | 'script'
  | 'copy'
  | 'export'
  | 'import'
// 事件
export interface ListenerAction {
  // 动作类型 逻辑动作  TODO:自定义（脚本支撑）|reload|url|ajax|dialog|drawer 其他扩充的组件动作
  actionType: ActionType

  // 组件ID，用于直接执行指定组件的动作
  componentId?: string

  componentName?: string // 组件名称，用于直接执行指定组件的动作

  args?: Record<string, any> // 动作配置

  ignoreError?: boolean // 当执行动作发生错误时，是否忽略并继续执行

  // [propName: string]: any
}

// 每个Action都需要实现的基类
export interface RendererAction {
  /**
   * 执行动作
   *
   */
  run: (
    action: EventNode<any>,
    eventData?: any,
    initEventData?: any
  ) => Promise<void>
}
