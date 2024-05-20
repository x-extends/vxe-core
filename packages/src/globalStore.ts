import { VxeGlobalConfig } from '../../types'

const globalConfigStore: Required<VxeGlobalConfig> = {
  size: '',
  theme: '',
  version: 1,
  zIndex: 999,
  resizeInterval: 500,

  i18n: (key: string) => key
}

export default globalConfigStore
