import XEUtils from 'xe-utils'
import { VxeCore } from './core'
import { i18nConfigStore } from './i18nStore'
import { globalConfigStore } from './configStore'

import { VxeGlobalI18nLocale } from '../../types'

let checkInstall = false

export function getI18n (key: string, args?: any) {
  const { langMaps, language } = i18nConfigStore
  const { i18n } = globalConfigStore
  if (i18n) {
    return `${i18n(key, args) || ''}`
  }
  if (!checkInstall) {
    if (!langMaps[language]) {
      console.error(`[vxe core] 语言包未安装。Language not installed. https://${VxeCore.uiVersion ? 'vxeui.com' : 'vxetable.cn'}/#/start/i18n`)
    }
    checkInstall = true
  }
  return XEUtils.toFormatString(XEUtils.get(langMaps[language], key, key), args)
}

export function setLanguage (locale: VxeGlobalI18nLocale) {
  i18nConfigStore.language = locale || 'zh-CN'
  return VxeCore
}

export function setI18n (locale: VxeGlobalI18nLocale, data: Record<string, any>) {
  i18nConfigStore.langMaps[locale] = Object.assign({}, data)
  return VxeCore
}

export function hasLanguage (language: VxeGlobalI18nLocale) {
  const { langMaps } = i18nConfigStore
  return !!langMaps[language]
}

export function getLanguage () {
  const { language } = i18nConfigStore
  return language
}
