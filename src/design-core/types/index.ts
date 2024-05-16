import { ComponentEvent } from '@core/utils/event-flow'

type ApiType = 'normal' | 'custom'
export interface ApiConfig {
  url: string
  method: 'get' | 'post'
  type: ApiType
}

/**
 * 页面字段
 */
export interface Variable {
  /**
   * 变量名
   */
  name: string
  /**
   * 默认值
   */
  defaultValue: string
  /**
   * 备注
   */
  remark: string
}

export interface VariablePropsItem {
  /**
   * 变量的类型，variable表示变量，formula表示公式
   */
  type: 'variable' | 'formula'
  /**
   * 变量的值
   */
  value: string
}

export interface HiddenConfig {
  type: 'static' | 'variable' | 'formula'

  value: string

  formula?: string
}

/**
 * 表示一个可复用的组件的接口。
 */
export interface ComponentScheme {
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
  description: string

  /**
   * 组件的唯一 ID，可能用于跟踪或管理组件实例。
   */
  componentId: string

  /**
   * 一个记录，键为属性名，值为属性值，表示组件需要接收的自定义属性。
   */
  props: Record<string, any>

  /**
   * 组件的变量属性，用于存储变量的值。
   */
  variableProps: Record<string, VariablePropsItem>

  /**
   * 子组件数组，表示组件结构的嵌套层次。
   */
  children: ComponentScheme[]

  /**
   * 可选的组件事件对象，包含组件支持的事件及其处理方法。
   */
  events?: ComponentEvent
  /**
   * 待完成：组件的插槽信息，允许插入自定义内容。
   */
  slots: any[]

  /**
   * 待完成：组件的样式信息，可能包括 CSS 规则或其他样式定义。
   */
  styles: any[]

  /**
   * 待完成：组件的示例数据，用于展示如何使用组件。
   */
  examples: any[]

  /**
   * 用于控制显示隐藏组件
   */
  hidden?: HiddenConfig
}
