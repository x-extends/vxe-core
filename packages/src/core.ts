import XEUtils from 'xe-utils'
import DomZIndex from 'dom-zindex'
import { globalConfigStore } from './globalStore'
import { iconConfigStore } from './iconStore'
import { themeConfigStore } from './themeStore'
import { i18nConfigStore } from './i18nStore'
import { globalEvents } from './event'
import { globalResize } from './resize'
import { getI18n } from './i18n'
import { renderer } from './renderer'
import { validators } from './validators'
import { menus } from './menus'
import { formats } from './formats'
import { commands } from './commands'
import { interceptor } from './interceptor'
import { clipboard } from './clipboard'
import { log } from './log'
import { hooks } from './hooks'

import { VxeUIExport, VxeGlobalConfig, VxeGlobalThemeName, VxeGlobalIcon, VxeGlobalI18nLocale } from '../../types'

export function setTheme (name?: VxeGlobalThemeName) {
  const theme = !name || name === 'default' ? 'light' : name
  themeConfigStore.theme = theme
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement
    if (documentElement) {
      documentElement.setAttribute('data-vxe-ui-theme', theme)
    }
  }
  return VxeUI
}

export function getTheme () {
  return themeConfigStore.theme
}

export function setLanguage (locale: VxeGlobalI18nLocale) {
  i18nConfigStore.language = locale
  return VxeUI
}

export function setI18n (locale: VxeGlobalI18nLocale, data: Record<string, any>) {
  i18nConfigStore.language = locale
  i18nConfigStore.langMaps[i18nConfigStore.language] = data || {}
  return VxeUI
}

/**
* 全局参数设置
*/
export function setConfig (options?: VxeGlobalConfig) {
  if (options) {
    if (options.zIndex) {
      DomZIndex.setCurrent(options.zIndex)
    }
    XEUtils.merge(globalConfigStore, options)
  }
  return VxeUI
}

/**
* 获取全局参数
*/
export function getConfig (key: keyof VxeGlobalConfig, defaultValue?: any) {
  return arguments.length ? XEUtils.get(globalConfigStore, key, defaultValue) : globalConfigStore
}

export function setIcon (options?: VxeGlobalIcon) {
  if (options) {
    Object.assign(iconConfigStore, options)
  }
  return VxeUI
}

export function getIcon (key: keyof VxeGlobalIcon) {
  return arguments.length ? XEUtils.get(iconConfigStore, key) : iconConfigStore
}

export const coreVersion = process.env.VUE_APP_VXE_VERSION as string

export const VxeUI: VxeUIExport = {
  coreVersion,

  setTheme,
  getTheme,
  setConfig,
  getConfig: getConfig as any,
  setIcon,
  getIcon: getIcon as any,
  setLanguage,
  setI18n,
  getI18n,

  globalEvents,
  globalResize,
  renderer,
  validators,
  menus,
  formats,
  commands,
  interceptor,
  clipboard,
  log,

  hooks
}

setTheme()

export * from './event'
export * from './resize'

export * from './i18n'
export * from './renderer'
export * from './validators'
export * from './menus'
export * from './formats'
export * from './commands'
export * from './interceptor'
export * from './clipboard'

export * from './use'
export * from './log'
export * from './hooks'

export default VxeUI
