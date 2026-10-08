
import XEUtils from 'xe-utils'

import { VxeDomUtils } from '../../types'

export const domUtils: VxeDomUtils = {
  /**
   * 生成 className
   */
  buildClass (staticClassNames, mapClassName) {
    const parts: string[] = []
    if (staticClassNames) {
      for (let i = 0; i < staticClassNames.length; i++) {
        const val = staticClassNames[i]
        if (val) {
          parts.push(val)
        }
      }
    }
    XEUtils.each(mapClassName, (val, key) => {
      if (val) {
        parts.push(key)
      }
    })
    return parts.join(' ')
  }
}
