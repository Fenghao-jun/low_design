interface EditorComponentSetter {
  /**
   * 这个属性作用于Scheme中哪个键
   */
  key: string
  /**
   * 显示在设置中可视化的名称
   */
  label: string

  /**
   * 用于展示这个设置的组件
   */
  component: string

  /**
   * 配置展示组件的属性
   */
  componentProps?: Record<string, any>
}

/**
 * 组件暴露的事件
 */
export interface ComponentEvent {
  name: string
  desc: string
}

/**
 * 组件暴露的方法
 */
export interface ComponentMethod {
  name: string
  desc: string
}

export interface EditorComponentConfig {
  /**
   * 组件的props配置选项
   */
  setter: EditorComponentSetter[]

  /**
   * 组件暴露的事件
   */
  events?: ComponentEvent[]

  /**
   * 组件暴露的方法
   */
  methods?: ComponentMethod[]

  /**
   * 组件的唯一标识符，通常用于区分不同的组件类型。
   */
  key: string

  /**
   * 显示给用户的组件名称。
   */
  name: string

  /**
   * 对组件的简要描述。
   */
  desc?: string
}
