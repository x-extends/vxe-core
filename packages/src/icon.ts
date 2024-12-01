import XEUtils from 'xe-utils'
import { VxeCore } from './core'
import { iconConfigStore } from './iconStore'

import { VxeGlobalIcon } from '../../types'

export function setIcon (options?: VxeGlobalIcon) {
  if (options) {
    Object.assign(iconConfigStore, options)
  }
  return VxeCore
}

export function getIcon (key: keyof VxeGlobalIcon) {
  return arguments.length ? XEUtils.get(iconConfigStore, key) : iconConfigStore
}
