export interface VxeZIndex {
  /**
   * 获取主层级下一个 z-index
   */
  next(): number
  /**
   * 获取主层级最后一个 z-index
   */
  getLast(): number
  /**
   * 获取子层级下一个 z-index
   */
  nextSub(): number
  /**
   * 获取子层级最后一个 z-index
   */
  getSubLast(): number
}
