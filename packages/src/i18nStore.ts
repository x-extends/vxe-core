import Vue from 'vue'

import { VxeGlobalI18nLocale } from '../../types'

export const i18nConfigStore: {
  language: VxeGlobalI18nLocale,
  langMaps: Partial<Record<VxeGlobalI18nLocale, any>>
} = Vue.reactive({
  language: '',
  langMaps: {}
})
