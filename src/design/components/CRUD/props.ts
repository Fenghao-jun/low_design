import { ListenerAction } from '@/design-core/utils/componentActionCenter/Action'
import { ApiConfig, ComponentScheme } from '@core/types'
import { ProTableProps } from 'am-admin-component'
import { EventNode } from '@core/utils/event-flow'

type RowOperationType = 'edit' | 'delete' | 'custom'

export interface RowOperation {
  desc?: string
  text: string
  events?: EventNode[]
}

type TableRowOperation = {
  [key in RowOperationType]: RowOperation
}

export interface CRUDProps extends ProTableProps {
  api: ApiConfig
  operations?: RowOperation[]
  headerSlot?: ComponentScheme[]
}
