import { ComponentEvent } from '../actions/Action'

type ApiType = 'normal' | 'custom'
export interface ApiConfig {
  url: string
  method: 'get' | 'post'
  type: ApiType
}

export interface Component {
  key: string
  name: string
  description: string
  componentId: string
  props: Record<string, any>
  children: Component[]
  events: ComponentEvent
  slots: any[]
  styles: any[]
  examples: any[]
}
