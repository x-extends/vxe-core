import XEUtils from 'xe-utils'
import { computed, inject, provide, ComputedRef } from 'vue'
import { handleCheckInfo } from './permission'

import type { VxeComponentSizeType, VxeComponentIsVScrollbar, VxeComponentPermissionCodeType, VxeComponentPermissionMethod } from '../../types'

export function useSize (props: {
  size?: VxeComponentSizeType
}) {
  // 组件尺寸上下文
  const xeSizeInfo = inject('xeSizeInfo', null as ComputedRef<VxeComponentSizeType> | null)
  const computeSize = computed(() => {
    const { size } = props
    return size || (xeSizeInfo ? xeSizeInfo.value : null)
  })
  provide('xeSizeInfo', computeSize)

  return { computeSize }
}

export function useVScrollbar (props: {
  useScrollbar?: VxeComponentIsVScrollbar
}) {
  // 组件虚拟滚动条
  const xeScrollbarInfo = inject('xeScrollbarInfo', null as ComputedRef<VxeComponentIsVScrollbar> | null)
  const computeIsVScrollbar = computed(() => {
    const { useScrollbar } = props
    return XEUtils.isBoolean(useScrollbar) ? useScrollbar : (xeScrollbarInfo ? xeScrollbarInfo.value : null)
  })
  provide('xeScrollbarInfo', computeIsVScrollbar)

  return { computeIsVScrollbar }
}

export function usePermission (props: {
  permissionCode?: VxeComponentPermissionCodeType
  permissionMethod?: VxeComponentPermissionMethod
}) {
  const computePermissionInfo = computed(() => {
    return handleCheckInfo(props.permissionCode, props.permissionMethod)
  })
  return {
    computePermissionInfo
  }
}

export const useFns = {
  useSize,
  useVScrollbar,
  usePermission
}
