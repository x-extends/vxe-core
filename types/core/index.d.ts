import { VxeGlobalConfig } from './global-config'
import { VxeGlobalIcon } from './global-icon'
import { VxeGlobalRenderer } from './renderer'
import { VxeGlobalValidators } from './validators'
import { VxeGlobalMenus } from './menus'
import { VxeGlobalFormats } from './formats'
import { VxeGlobalCommands } from './commands'
import { VxeGlobalInterceptor } from './interceptor'
import { VxeGlobalClipboard } from './clipboard'
import { VxeGlobalHooks } from './hooks'

/* eslint-disable no-use-before-define */

export function setConfig(options?: VxeGlobalConfig): VxeCoreExport

export function getConfig(key: string | number | null | undefined, defaultValue?: any): any

export function setIcon(options?: VxeGlobalIcon): VxeCoreExport

export function getIcon(key: string): any

export function getI18n(key: string, args?: any): string

export const version: string

export const renderer: VxeGlobalRenderer

export const validators: VxeGlobalValidators

export const menus: VxeGlobalMenus

export const formats: VxeGlobalFormats

export const commands: VxeGlobalCommands

export const interceptor: VxeGlobalInterceptor

export const clipboard: VxeGlobalClipboard

export const hooks: VxeGlobalHooks

export interface VxeCoreExport {
  /**
   * 版本号
   */
  version: string
  /**
   * 设置全局参数
   */
  setConfig: typeof setConfig
  /**
   * 获取全局参数
   */
  getConfig: typeof getConfig
  /**
   * 设置全局图标
   */
  setIcon: typeof setIcon
  /**
   * 翻译组件语言
   */
  getI18n: typeof getI18n
  /**
   * 获取全局图标
   */
  getIcon: typeof getIcon,

  /**
   * 全局渲染器
   */
  renderer: VxeGlobalRenderer
  /**
   * 全局校验扩展
   */
  validators: VxeGlobalValidators
  /**
   * 全局右键菜单扩展
   */
  menus: VxeGlobalMenus
  /**
   * 全局格式化对象
   */
  formats: VxeGlobalFormats
  /**
   * 全局操作指令
   */
  commands: VxeGlobalCommands
  /**
   * 全局事件拦截处理对象
   */
  interceptor: VxeGlobalInterceptor
  /**
   * 全局剪贴板
   */
  clipboard: VxeGlobalClipboard

  // 扩展插件
  hooks: VxeGlobalHooks
}

export declare const VxeCore: VxeCoreExport

export * from './global-config'
export * from './global-icon'
export * from './renderer'
export * from './validators'
export * from './menus'
export * from './formats'
export * from './commands'
export * from './interceptor'
export * from './clipboard'

export * from './hooks'

export default VxeCore
