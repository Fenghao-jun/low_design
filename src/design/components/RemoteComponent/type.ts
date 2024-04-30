export interface RemoteConfig {
  scope: string
  target: string
}

export interface Props {
  remoteConfig: RemoteConfig
  componentProps: Record<string, any>
  componentEvents: Record<string, () => void>
}
