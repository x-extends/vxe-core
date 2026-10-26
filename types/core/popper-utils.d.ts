export interface VxePopperOptions {
  defaultTop?: number
  defaultLeft?: number
  placement?: '' | 'top' | 'bottom' | null
  defaultPlacement?: '' | 'top' | 'bottom' | null
  appendTo?: string | HTMLElement | ((params: any) => string | HTMLElement)
  teleportTo?: boolean
  marginSize?: number
  isMinWidth?: boolean
}

export interface VxePopperPlacementResult {
  top: number
  bottom: number
  left: number
  arrowLeft: number
  style: Record<string, string>
  placement: 'top' | 'bottom'
}

export interface VxePopperUtils {
  /**
   * 更新位置
   * @param targetElem
   * @param panelElem
   * @param options
   */
  updatePlacement(targetElem: HTMLElement | null | undefined, panelElem: HTMLElement | null | undefined, options: VxePopperOptions): VxePopperPlacementResult
  /**
   * 获取包裹容器的元素
   * @param panelElem
   */
  getWrapperElement(panelElem: HTMLElement | null | undefined): HTMLElement | null
  /**
   * 获取插入到指定容器的元素或字符串
   * @param appendTo
   */
  getAppendSelector(appendTo: string | HTMLElement | ((params: any) => string | HTMLElement) | undefined): HTMLElement | string
  /**
   * 获取插入到指定容器的元素
   * @param appendTo
   */
  getAppendElement(appendTo: string | HTMLElement | ((params: any) => string | HTMLElement) | undefined): HTMLElement | null
}
