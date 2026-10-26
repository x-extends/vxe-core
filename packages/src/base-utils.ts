import XEUtils from 'xe-utils'

import { VxeBaseUtils, VxeBaseEmptyValue } from '../../types'

export const baseUtils: VxeBaseUtils = {
  /**
   * 转成字符串
   */
  toString(content) {
    if (XEUtils.eqNull(content)) {
      return ''
    }
    return '' + content
  },
  /**
   * 判断值为：'' | null | undefined 时都属于空值
   */
  isEmpty(value): value is VxeBaseEmptyValue {
    return value === null || value === undefined || value === ''
  },
  /**
   * 获取配置值，如果存在则返回，如果不存在则使用默认值
   */
  getDefVal(value, defVal) {
    return XEUtils.eqNull(value) ? defVal : value
  },
  /**
   * 判断是否启用
   */
  isEnabled(conf: any) {
    return !!(conf && conf.enabled !== false)
  },
  /**
   * 用于开关类型的配置项
   * 局部启用规则：conf={}
   * 局部禁用规则：conf={enabled:false}
   * 全局默认启用规则：conf.enabled=true
   */
  hasEnableConf(conf, opts) {
    return !!(opts && (conf ? opts.enabled !== false : opts.enabled))
  }
}
