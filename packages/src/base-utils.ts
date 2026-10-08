
import XEUtils from 'xe-utils'

import { VxeBaseUtils, VxeBaseEmptyValue } from '../../types'

export const baseUtils: VxeBaseUtils = {
  /**
   * 转成字符串
   */
  toString (content) {
    if (XEUtils.eqNull(content)) {
      return ''
    }
    return '' + content
  },
  /**
   * 判断值为：'' | null | undefined 时都属于空值
   */
  isEmpty (value) : value is VxeBaseEmptyValue {
    return value === null || value === undefined || value === ''
  }
}
