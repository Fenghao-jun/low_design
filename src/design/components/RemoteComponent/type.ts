export interface Props {
  remote: {
    scope: string
    name: string
  }
  componentProps?: Record<string, any>
  componentEvents?: Record<string, string>
}
