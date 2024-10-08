import XEUtils from 'xe-utils'
import DomZIndex from 'dom-zindex'
import { createCommentVNode } from 'vue'
import { globalConfigStore } from './configStore'
import { globalStore } from './dataStore'
import { iconConfigStore } from './iconStore'
import { themeConfigStore } from './themeStore'
import { i18nConfigStore } from './i18nStore'
import { globalEvents, GLOBAL_EVENT_KEYS, createEvent } from './event'
import { globalResize } from './resize'
import { getI18n, hasLanguage, getLanguage } from './i18n'
import { renderer } from './renderer'
import { validators } from './validators'
import { menus } from './menus'
import { formats } from './formats'
import { commands } from './commands'
import { interceptor } from './interceptor'
import { clipboard } from './clipboard'
import { permission } from './permission'
import { log } from './log'
import { hooks } from './hooks'
import { useFns } from './useFns'

import { VxeUIExport, VxeGlobalConfig, VxeGlobalThemeName, VxeGlobalComponents, VxeGlobalIcon, VxeUIPluginObject, VxeGlobalI18nLocale } from '../../types'

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
  i18nConfigStore.language = locale || 'zh-CN'
  return VxeUI
}

export function setI18n (locale: VxeGlobalI18nLocale, data: Record<string, any>) {
  i18nConfigStore.langMaps[locale] = Object.assign({}, data)
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
    if (options.theme) {
      setTheme(options.theme)
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

const installedPlugins: VxeUIPluginObject[] = []

export function use (Plugin: VxeUIPluginObject, options: any[]) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VxeUI, options)
      installedPlugins.push(Plugin)
    }
  }
  return VxeUI
}

const components: Record<string, any> = {}

export function getComponent (name: keyof VxeGlobalComponents) {
  return components[name] || null
}

export function component (comp: any) {
  if (comp && comp.name) {
    components[comp.name] = comp
  }
}

export function renderEmptyElement () {
  return createCommentVNode()
}

export const VxeUI: VxeUIExport = {
  coreVersion,

  renderEmptyElement,

  setTheme,
  getTheme,
  setConfig,
  getConfig: getConfig as any,
  setIcon,
  getIcon: getIcon as any,
  setLanguage,
  hasLanguage,
  getLanguage,
  setI18n,
  getI18n,

  globalEvents,
  GLOBAL_EVENT_KEYS,
  createEvent,

  globalResize,
  renderer,
  validators,
  menus,
  formats,
  commands,
  interceptor,
  clipboard,
  log,
  permission,

  globalStore,

  hooks,
  component,
  getComponent,
  useFns,

  use
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
export * from './permission'

export * from './dataStore'

export * from './useFns'
export * from './log'
export * from './hooks'

export default VxeUI
