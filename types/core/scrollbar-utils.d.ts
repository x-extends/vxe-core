
export interface VxeScrollbarUtils {
  /**
   * 计算滚动条滑块的长度
   * @param viewportSize
   * @param contentSize
   * @param trackSize
   */
  getThumbSize (viewportSize: number, contentSize: number, trackSize: number): number
  /**
   * 计算滚动条滑块的偏移位置
   * @param offsetSize
   * @param viewportSize
   * @param contentSize
   * @param trackSize
   * @param thumbSize
   */
  getThumbOffsetSize (offsetSize: number, viewportSize: number, contentSize: number, trackSize: number, thumbSize: number): number
  /**
   * 根据点击轨道的位置，计算滑块的偏移位置
   * @param clickPosition
   * @param viewportSize
   * @param contentSize
   * @param trackSize
   * @param thumbSize
   */
  getScrollFromClick (clickPosition: number, viewportSize: number, contentSize: number, trackSize: number, thumbSize: number): number
  /**
   * 拖拽 thumb 时，根据鼠标位置计算滑块的偏移位置
   * @param pointerPosition
   * @param dragOffset
   * @param viewportSize
   * @param contentSize
   * @param trackSize
   * @param thumbSize
   */
  getScrollFromDrag (pointerPosition: number, dragOffset: number, viewportSize: number, contentSize: number, trackSize: number, thumbSize: number): number
}
