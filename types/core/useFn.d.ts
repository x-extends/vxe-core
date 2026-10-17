import { ComputedRef, Ref } from 'vue'
import { VxeComponentBaseOptions } from '../tool/common'
import { VxeComponentSizeType, VxeComponentIsVScrollbar, VxeComponentPermissionCodeType, VxeComponentPermissionMethod, VxeComponentPermissionInfo } from '../tool'

export interface VxeUseSizeResult {
  computeSize: ComputedRef<VxeComponentSizeType>
}
export type VxeUseSize = (props: {
  size?: VxeComponentSizeType;
}) => VxeUseSizeResult

/**
 * 组件尺寸上下文
 */
export const useSize: VxeUseSize

export interface VxeUsePermissionResult {
  computePermissionInfo: ComputedRef<VxeComponentPermissionInfo>
}
export type VxeUsePermission = (props: {
  permissionCode?: VxeComponentPermissionCodeType
  permissionMethod?: VxeComponentPermissionMethod
}) => VxeUsePermissionResult

/**
 * 权限码处理
 */
export const usePermission: VxeUsePermission

export interface VxeUseVScrollbarResult {
  computeIsVScrollbar: ComputedRef<VxeComponentIsVScrollbar>
}
export type VxeUseVScrollbar = (props: {
  useScrollbar?: VxeComponentIsVScrollbar;
}) => VxeUseVScrollbarResult

/**
 * 虚拟滚动条是否启用
 */
export const useVScrollbar: VxeUseVScrollbar

export interface VxeUseInitVScrollbarReactData {
  yThumbHeight: number
  xThumbWidth: number
}
export interface VxeUseInitVScrollbarInternalData {
  scrollObserver?: ResizeObserver
  isThumbDrag?: boolean
  thumbDragOffset: number
  yThumbTop: number
  xThumbLeft: number
  lastScrollTop: number
  lastScrollLeft: number
}
export interface VxeUseInitVScrollbarResult {
  /**
   * 内部方法
   * @private
   */
  updateThumbSize(): void
  /**
   * 内部方法
   * @private
   */
  updateThumbOffset(): void
  /**
   * 内部方法
   * @private
   */
  clickTrackXEvent(evnt: MouseEvent): void
  /**
   * 内部方法
   * @private
   */
  clickTrackYEvent(evnt: MouseEvent): void
  /**
   * 内部方法
   * @private
   */
  pointerdownThumbXEvent(evnt: PointerEvent): void
  /**
   * 内部方法
   * @private
   */
  pointermoveThumbXEvent(evnt: PointerEvent): void
  /**
   * 内部方法
   * @private
   */
  cleatPointerThumbEvent(evnt: PointerEvent): void
  /**
   * 内部方法
   * @private
   */
  pointerdownThumbYEvent(evnt: PointerEvent): void
  /**
   * 内部方法
   * @private
   */
  pointermoveThumbYEvent(evnt: PointerEvent): void
}

export type VxeUseInitVScrollbar = ($xeVM: VxeComponentBaseOptions & {
  reactData: VxeUseInitVScrollbarReactData
  internalData: VxeUseInitVScrollbarInternalData
  getScrollViewElem(): HTMLElement | null | undefined
}) => VxeUseInitVScrollbarResult & {
  refTrackXElem: Ref<HTMLDivElement | undefined>
  refTrackYElem: Ref<HTMLDivElement | undefined>
  refThumbXElem: Ref<HTMLDivElement | undefined>
  refThumbYElem: Ref<HTMLDivElement | undefined>
}
/**
 * 初始化虚拟滚动条
 */
export const useInitVScrollbar: VxeUseInitVScrollbar

/**
 * 通用方法
 */
export interface VxeGlobalUseFns {
  useSize: VxeUseSize
  useVScrollbar: VxeUseVScrollbar
  usePermission: VxeUsePermission
  useInitVScrollbar: VxeUseInitVScrollbar
}
