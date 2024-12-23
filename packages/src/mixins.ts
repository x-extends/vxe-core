import Vue from 'vue'
import { handleCheckInfo } from './permission'

import { VxeComponentSizeType } from '../../types'

export const sizeMixin = Vue.extend({
  inject: {
    $xeSizeInfo: {
      default: null
    }
  },
  provide (this: any) {
    return {
      $xeSizeInfo: {
        getSize: () => this.computeSize
      }
    }
  },
  computed: {
    computeSize (this: any): VxeComponentSizeType {
      const { size } = this
      const $xeSizeInfo = this.$xeSizeInfo
      return size || ($xeSizeInfo ? $xeSizeInfo.getSize() : null)
    }
  }
})

export const permissionMixin = Vue.extend({
  computed: {
    computePermissionInfo (this: any) {
      return handleCheckInfo(this.permissionCode, this.permissionMethod)
    }
  }
})

export const globalMixins = {
  sizeMixin,
  permissionMixin
}
