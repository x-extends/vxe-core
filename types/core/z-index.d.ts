export interface VxeZIndex {
  /**
   * 获取下一个 z-index
   */
  next (): number
  /**
   * 获取最后一个 z-index
   */
  getLast (): number
}
