import { ApiConfig } from '@core/types'
import { ProTableProps } from 'am-admin-component'

export interface CRUDProps extends ProTableProps {
  api: ApiConfig
}
