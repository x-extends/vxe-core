import { VxeCore } from './src/core'
import { createCommentVNode } from 'vue'
import { setConfig, getConfig } from './src/config'
import { globalStore } from './src/dataStore'
import { setIcon, getIcon } from './src/icon'
import { setTheme, getTheme } from './src/theme'
import { globalEvents, GLOBAL_EVENT_KEYS, createEvent } from './src/event'
import { globalResize } from './src/resize'
import { getI18n, setI18n, setLanguage, hasLanguage, getLanguage } from './src/i18n'
import { renderer } from './src/renderer'
import { validators } from './src/validators'
import { menus } from './src/menus'
import { formats } from './src/formats'
import { commands } from './src/commands'
import { interceptor } from './src/interceptor'
import { clipboard } from './src/clipboard'
import { permission } from './src/permission'
import { log } from './src/log'
import { hooks } from './src/hooks'
import { useFns } from './src/useFns'
import XEUtils from 'xe-utils'

import { VxeGlobalComponents, VxeUIPluginObject } from '../types'

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
    components[XEUtils.kebabCase(comp.name)] = comp
  }
}

export function renderEmptyElement () {
  return createCommentVNode()
}

export const VxeUI = Object.assign(VxeCore, {
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
})

setTheme()

export * from './src/core'
export * from './src/event'
export * from './src/resize'

export * from './src/config'
export * from './src/i18n'
export * from './src/icon'
export * from './src/theme'
export * from './src/renderer'
export * from './src/validators'
export * from './src/menus'
export * from './src/formats'
export * from './src/commands'
export * from './src/interceptor'
export * from './src/clipboard'
export * from './src/permission'

export * from './src/dataStore'

export * from './src/useFns'
export * from './src/log'
export * from './src/hooks'

export default VxeUI
