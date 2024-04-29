import { ApiConfig } from '@core/types'
import { ProTableProps } from 'am-admin-component'

type RowOperationType = 'edit' | 'delete' | 'custom'

interface RowOperation {
  desc: string
  action: string
}

type TableRowOperation = {
  [key in RowOperationType]: RowOperation
}

export interface CRUDProps extends ProTableProps {
  api: ApiConfig
}
