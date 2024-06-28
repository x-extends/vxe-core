import { globalConfigStore } from './globalStore'
import XEUtils from 'xe-utils'

import type { VxeGlobalPermission, VxeComponentPermissionCodeType, VxeComponentPermissionInfo, VxeComponentPermissionMethod } from '../../types'

export function handleCheckInfo (code?: VxeComponentPermissionCodeType, permissionMethod?: VxeComponentPermissionMethod) {
  let visible = true
  let disabled = false
  const checkMethod = permissionMethod || globalConfigStore.permissionMethod
  if (code && checkMethod) {
    const rest = checkMethod({ code })
    if (XEUtils.isBoolean(rest)) {
      visible = rest
    } else if (rest) {
      visible = !!rest.visible
      disabled = !!rest.disabled
    }
  }
  const info: VxeComponentPermissionInfo = {
    code,
    visible,
    disabled
  }
  return info
}

export const permission: VxeGlobalPermission = {
  getCheckInfo (code) {
    return handleCheckInfo(code)
  },
  checkVisible (code) {
    const permissionInfo = handleCheckInfo(code)
    return permissionInfo.visible
  },
  checkDisable (code) {
    const permissionInfo = handleCheckInfo(code)
    return permissionInfo.disabled
  }
}
