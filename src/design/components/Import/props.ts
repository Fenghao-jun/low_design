import { ApiConfig } from '@/design-core/types'

interface ImportTemplate {
  url: string
  text?: string
  filename?: string
}

interface ErrorTableColumns {
  props: string
  label: string
  width?: string
}

export interface ImportProps {
  api: ApiConfig
  template?: ImportTemplate
  templateUrl?: string
  templateText?: string
  errorColumns?: ErrorTableColumns[]
}
