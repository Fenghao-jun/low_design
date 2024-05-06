import { ElForm } from 'element-plus'

type ElFormProps = Parameters<Exclude<(typeof ElForm)['setup'], undefined>>[0]

export interface FormProps {
  children?: any[]
  formProps?: Partial<ElFormProps>
  [key: string]: any
}
