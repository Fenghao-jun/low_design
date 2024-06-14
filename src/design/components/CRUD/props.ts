import { ListenerAction } from '@/design-core/utils/componentActionCenter/Action'
import { RequestActionArgs } from '@core/actions/RequestAction'
import { ApiConfig, ComponentScheme, HiddenConfig } from '@core/types'
import { ProTableProps, ColumnProps } from 'am-admin-component'
import { EventNode } from '@core/utils/event-flow'

type RowOperationType = 'edit' | 'delete' | 'custom'

/**
 * 操作列
 */
export interface RowOperation {
  desc?: string
  text: string
  hidden?: HiddenConfig
  events?: EventNode[]
}

type TableRowOperation = {
  [key in RowOperationType]: RowOperation
}

export interface ColumnsProps extends ColumnProps {
  api?: RequestActionArgs
}

export interface CRUDProps extends ProTableProps {
  /**
   * 请求的数据
   */
  api: RequestActionArgs
  operations?: RowOperation[]
  /**
   * 自定义头部插槽
   */
  headerSlot?: ComponentScheme[]
  /**
   * 列配置
   */
  columns: ColumnsProps[]
  /**
   * 操作列宽度
   */
  operationColumnWidth?: string | number
}
