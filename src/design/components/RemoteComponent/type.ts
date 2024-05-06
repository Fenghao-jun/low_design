export interface Props {
  remote: {
    scope: string
    name: string
  }
  events?: Record<string, any>
  [key: string]: any
}
