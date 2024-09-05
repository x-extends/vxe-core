import Vue, { VueConstructor, VNode } from 'vue'
import { ExtendedVue } from 'vue/types/vue'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

/**
 * 定义组件
 */
export type DefineVxeComponentApp<
  P extends Vue = any,
  E = { [key: string]: any },
  S = { [key: string]: (...args: any[]) => any }
> = ({
  new (): P & E & {
    $slots: S
  }
} & {
  install(app: VueConstructor): void
})

export type DefineVxeComponentOptions<P, M> = ExtendedVue<Vue, P, M, object, object>

export type DefineVxeComponentInstance<P, M> = P & M

/**
 * 组件通用的基础参数
 */
export interface VxeComponentBaseOptions {
  xID: string
}

/**
 * 组件事件参数
 */
export interface VxeComponentEventParams {
  $event: Event
}

/**
 * 全局事件默认参数
 */
export interface VxeComponentEvent<E = Event> {
  $event: E
  stopPropagation(): void
  preventDefault(): void
}

/**
 * 组件尺寸类型
 */
export type VxeComponentSizeType = null | '' | 'medium' | 'small' | 'mini'

/**
 * 组件对齐方式
 */
export type VxeComponentAlignType = null | '' | 'left' | 'right' | 'center'

/**
 * 组件状态
 */
export type VxeComponentStatusType = null | '' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'perfect'

/**
 * 组件样式类型
 */
export type VxeComponentStyleType = Record<string, string | number>

/**
 * 组件 className 类型
 */
export type VxeComponentClassNameType = Record<string, boolean>

/**
 * 组件插槽类型
 */
export type VxeComponentSlotType = VNode | string

/**
 * 权限码类型
 */
export type VxeComponentPermissionCodeType = string | number

/**
 * 权限码判断结果
 */
export type VxeComponentPermissionResult = boolean | {
  visible: boolean
  disabled: boolean
}

/**
 * 权限码判断方法
 */
export type VxeComponentPermissionMethod = (params: {
  code: VxeComponentPermissionCodeType
}) => VxeComponentPermissionResult

/**
 * 权限码信息
 */
export interface VxeComponentPermissionInfo {
  code?: VxeComponentPermissionCodeType
  visible: boolean
  disabled: boolean
}
