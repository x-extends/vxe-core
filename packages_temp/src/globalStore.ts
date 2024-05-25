import { VxeGlobalConfig } from '../../types'

export const globalConfigStore: Required<VxeGlobalConfig> = {
  authId: '',
  size: '',
  version: 1,
  zIndex: 999,
  resizeInterval: 500,

  i18n: (key: string) => key
}
