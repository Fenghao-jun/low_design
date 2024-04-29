import { ComponentEvent } from '@core/utils/componentActionCenter/Action'

type ApiType = 'normal' | 'custom'
export interface ApiConfig {
  url: string
  method: 'get' | 'post'
  type: ApiType
}

export interface Component {
  key: string // 组件类型
  name: string // 组件名字
  description: string // 描述
  componentId: string // 组件ID
  props: Record<string, any> // 你自己组件需要传递进去的props
  children: Component[]

  events: ComponentEvent // 组件事件
  slots: any[]
  styles: any[]
  examples: any[]
}
