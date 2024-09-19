import Vue from 'vue'
import { VxeGlobalI18nLocale } from '../../types'

const I18nStore = Vue.extend({
  data () {
    return {
      language: '' as VxeGlobalI18nLocale,
      langMaps: {} as Partial<Record<VxeGlobalI18nLocale, any>>
    }
  }
})

export const i18nConfigStore = new I18nStore() as {
  language: VxeGlobalI18nLocale,
  langMaps: Partial<Record<VxeGlobalI18nLocale, any>>
}
