import { Vue, ExtendedVue } from 'vue/types/vue'
import { VxeComponentSizeType, VxeComponentIsVScrollbar, VxeComponentPermissionInfo } from '../tool'

/* eslint-disable @typescript-eslint/ban-types */

type ToComputed<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
  ? () => (...args: A) => R
  : () => T[K]
}

export interface VxeUseSizeResult {
  computeSize: VxeComponentSizeType
}
export type VxeUseSizeComputed = ToComputed<VxeUseSizeResult>

export interface VxeUsePermissionResult {
  computePermissionInfo: VxeComponentPermissionInfo
}
export type VxeUsePermissionComputed = ToComputed<VxeUsePermissionResult>

export interface VxeUseVScrollbarResult {
  computeIsVScrollbar: VxeComponentIsVScrollbar
}
export type VxeUseVScrollbarComputed = ToComputed<VxeUseVScrollbarResult>

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
export type VxeUseInitVScrollbarComputed = ToComputed<VxeUseInitVScrollbarResult>

/**
 * 通用方法
 */
export interface VxeGlobalUseMixins {
  /**
   * 组件尺寸上下文
   */
  sizeMixin: ExtendedVue<Vue, {}, {}, VxeUseSizeResult, Record<string, any>>
  /**
   * 权限码处理
   */
  permissionMixin: ExtendedVue<Vue, {}, {}, VxeUsePermissionResult, Record<string, any>>
  /**
   * 虚拟滚动条是否启用
   */
  vScrollbarMixin: ExtendedVue<Vue, {}, {}, VxeUseVScrollbarResult, Record<string, any>>
  /**
   * 虚拟滚动条是否启用
   */
  initVScrollbarMixin: ExtendedVue<Vue, {}, VxeUseInitVScrollbarResult, {}, Record<string, any>>
}
