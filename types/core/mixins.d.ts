import { Vue, ExtendedVue } from 'vue/types/vue'
import { VxeComponentSizeType, VxeComponentPermissionInfo } from '../tool'

/* eslint-disable @typescript-eslint/ban-types */

/**
 * 通用方法
 */
export interface VxeGlobalUseMixins {
  sizeMixin: ExtendedVue<Vue, {}, {}, {
    computeSize: VxeComponentSizeType
  }, Record<string, any>>
  permissionMixin: ExtendedVue<Vue, {}, {}, {
    computePermissionInfo: VxeComponentPermissionInfo
  }, Record<string, any>>
}
