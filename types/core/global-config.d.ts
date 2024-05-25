import { VxeComponentSizeType } from '../tool'

/**
 * 全局参数对象
 */
export interface VxeGlobalConfig {
  /**
   * 企业版的授权 ID
   */
  authId?: string
  /**
   * 全局默认 z-index
   */
  zIndex?: number
  /**
   * 全局组件尺寸
   */
  size?: VxeComponentSizeType
  version?: string | number
  resizeInterval?: number
  /**
   * 支持对组件中特定的字段进行翻译
   * @param key
   * @param args
   * @returns
   */
  translate?:(key: string, args?: any) => string
}
