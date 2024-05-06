import { ListenerAction } from '@/design-core/utils/componentActionCenter/Action'
import { ApiConfig, ComponentScheme } from '@core/types'
import { ProTableProps } from 'am-admin-component'

type RowOperationType = 'edit' | 'delete' | 'custom'

export interface RowOperation extends ListenerAction {
  desc?: string
  text: string
}

type TableRowOperation = {
  [key in RowOperationType]: RowOperation
}

export interface CRUDProps extends ProTableProps {
  api: ApiConfig
  operations?: TableRowOperation
  headerSlot?: ComponentScheme[]
}
