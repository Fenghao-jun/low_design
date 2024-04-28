import { ApiConfig } from '@core/types'
import { ProTableProps } from 'am-admin-component'

type RowOperation = 'edit' | 'delete' | 'custom'

interface TableRowOperation {
  type
}

export interface CRUDProps extends ProTableProps {
  api: ApiConfig
}
