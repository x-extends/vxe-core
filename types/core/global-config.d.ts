import { VxeComponentSizeType } from '../tool'

/**
 * 全局参数对象
 */
export interface VxeGlobalConfig {
  authId?: string
  zIndex?: number
  size?: VxeComponentSizeType
  version?: string | number
  resizeInterval?: number

  i18n?(key: string, args?: any): string
}
