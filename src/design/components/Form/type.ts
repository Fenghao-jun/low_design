import { ElForm, ElRow } from 'element-plus'

type ElFormProps = Parameters<Exclude<(typeof ElForm)['setup'], undefined>>[0]
type ElRowProps = Parameters<Exclude<(typeof ElRow)['setup'], undefined>>[0]
export interface FormProps {
  children?: any[]
  formProps?: Partial<ElFormProps>
  rowProps?: Partial<ElRowProps>
}
