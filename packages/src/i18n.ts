import XEUtils from 'xe-utils'
import { i18nConfigStore } from './i18nStore'

export function getI18n (key: string, args?: any) {
  return XEUtils.toFormatString(XEUtils.get(i18nConfigStore.langMaps[i18nConfigStore.language], key), args)
}
