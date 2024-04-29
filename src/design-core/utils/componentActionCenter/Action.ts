type ActionType = 'link'
// 事件
export interface ListenerAction {
  actionType: ActionType // 动作类型 逻辑动作  TODO:自定义（脚本支撑）|reload|url|ajax|dialog|drawer 其他扩充的组件动作

  componentId?: string // 组件ID，用于直接执行指定组件的动作

  componentName?: string // 组件名称，用于直接执行指定组件的动作

  args?: Record<string, any> // 动作配置

  ignoreError?: boolean // 当执行动作发生错误时，是否忽略并继续执行

  // [propName: string]: any
}

/**
 * 组件事件接口定义
 * 该接口用于描述组件可能会触发的各种事件，以及每个事件对应的一系列操作。
 */
export interface ComponentEvent {
  [key: string]: ListenerAction[]
}

// 每个Action都需要实现的基累
export interface RendererAction {
  // TODO run函数的入参
  run: (action: any, renderer: any, ...arg) => Promise<void>
}
