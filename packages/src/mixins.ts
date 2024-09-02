import { handleCheckInfo } from './permission'

export const sizeMixin = {
  inject: {
    $xeSizeInfo: {
      default: null
    }
  },
  provide (this: any) {
    return {
      $xeSizeInfo: {
        size: this.vSize
      }
    }
  },
  computed: {
    vSize (this: any) {
      const { $xeSizeInfo, size } = this
      return size || ($xeSizeInfo ? $xeSizeInfo.size : null)
    }
  }
}

export const permissionMixin = {
  props: {
    permissionCode: String
  },
  computed: {
    permissionInfo (this: any) {
      return handleCheckInfo(this.permissionCode, this.permissionMethod)
    }
  }
}

export const mixins = {
  sizeMixin,
  permissionMixin
}
