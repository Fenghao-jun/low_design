import { ListenerAction } from '@/design-core/utils/componentActionCenter/Action'
import { RequestActionArgs } from '@core/actions/RequestAction'
import { ApiConfig, ComponentScheme, HiddenConfig } from '@core/types'
import { ProTableProps, ColumnProps } from 'am-admin-component'
import { EventNode } from '@core/utils/event-flow'

type RowOperationType = 'edit' | 'delete' | 'custom'

export interface RowOperation {
  desc?: string
  text: string
  hidden?: HiddenConfig
  events?: EventNode[]
}

type TableRowOperation = {
  [key in RowOperationType]: RowOperation
}

interface ColumnsProps extends ColumnProps {
  api?: any
}

export interface CRUDProps extends ProTableProps {
  api: RequestActionArgs
  operations?: RowOperation[]
  headerSlot?: ComponentScheme[]
  columns: ColumnsProps[]

  operationColumnWidth?: string | number
}
