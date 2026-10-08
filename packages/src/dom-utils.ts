
import XEUtils from 'xe-utils'

import { VxeDomUtils } from '../../types'

export const domUtils: VxeDomUtils = {
  /**
   * 生成 className
   */
  buildClass (staticClassName, mapClassName) {
    const parts: string[] = []
    if (staticClassName) {
      parts.push(staticClassName)
    }
    XEUtils.each(mapClassName, (val, key) => {
      if (val) {
        parts.push(key)
      }
    })
    return parts.join(' ')
  }
}
