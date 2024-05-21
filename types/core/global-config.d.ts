import { VxeComponentSize } from '../tool'

/**
 * 全局参数对象
 */
export interface VxeGlobalConfig {
  zIndex?: number
  size?: VxeComponentSize
  version?: string | number
  resizeInterval?: number

  i18n?(key: string, args?: any): string
}
