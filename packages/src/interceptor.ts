import XEUtils from 'xe-utils'
import { log } from './log'

import { VxeGlobalInterceptor, VxeGlobalInterceptorHandles } from '../../types'

const storeMap: { [type: string]: VxeGlobalInterceptorHandles.InterceptorCallback[] } = {}

export const interceptor: VxeGlobalInterceptor = {
  mixin (options) {
    XEUtils.each(options, (callback: VxeGlobalInterceptorHandles.InterceptorCallback, type) => {
      interceptor.add(type, callback)
    })
    return interceptor
  },
  get (type) {
    return storeMap[type] || []
  },
  add (type, callback) {
    if (callback) {
      let eList = storeMap[type]
      if (!eList) {
        eList = storeMap[type] = []
      }

      // 检测重复
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (eList.indexOf(callback) > -1) {
          log.warn('vxe.error.coverProp', ['Interceptor', type])
        }
      }

      eList.push(callback)
    }
    return interceptor
  },
  delete (type, callback) {
    const eList = storeMap[type]
    if (eList) {
      if (callback) {
        XEUtils.remove(eList, fn => fn === callback)
      } else {
        delete storeMap[type]
      }
    }
  }
}
