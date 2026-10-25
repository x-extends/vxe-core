import DomZIndex from 'dom-zindex'

import { VxeZIndex } from '../../types'

export const zIndex: VxeZIndex = {
  /**
   * 获取下一个 z-index
   */
  next () {
    return DomZIndex.getNext()
  },
  /**
   * 获取最后一个 z-index
   */
  getLast () {
    return DomZIndex.getCurrent()
  }
}
