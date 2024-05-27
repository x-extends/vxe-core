import XEUtils from 'xe-utils'
import { i18nConfigStore } from './i18nStore'

export function getI18n (key: string, args?: any) {
  const { langMaps, language } = i18nConfigStore
  return XEUtils.toFormatString(XEUtils.get(langMaps[language], key, key), args)
}
