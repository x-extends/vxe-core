import XEUtils from 'xe-utils'
import { i18nConfigStore } from './i18nStore'
import { globalConfigStore } from './configStore'

import { VxeGlobalI18nLocale } from '../../types'

export function getI18n (key: string, args?: any) {
  const { langMaps, language } = i18nConfigStore
  const { i18n } = globalConfigStore
  if (i18n) {
    return `${i18n(key, args) || ''}`
  }
  return XEUtils.toFormatString(XEUtils.get(langMaps[language], key, key), args)
}

export function hasLanguage (language: VxeGlobalI18nLocale) {
  const { langMaps } = i18nConfigStore
  return !!langMaps[language]
}

export function getLanguage () {
  const { language } = i18nConfigStore
  return language
}
