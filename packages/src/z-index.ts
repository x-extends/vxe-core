import DomZIndex from 'dom-zindex'

import { VxeZIndex } from '../../types'

export const zIndex: VxeZIndex = {
  /**
   * 获取主层级下一个 z-index
   */
  next () {
    return DomZIndex.getNext()
  },
  /**
   * 获取主层级最后一个 z-index
   */
  getLast () {
    return DomZIndex.getCurrent()
  },
  /**
   * 获取子层级的下一个 z-index
   */
  nextSub () {
    return DomZIndex.getSubNext()
  },
  /**
   * 获取子层级的最后一个 z-index
   */
  getSubLast () {
    return DomZIndex.getSubCurrent()
  }
}
