import { ComputedRef } from 'vue'
import { VxeComponentSizeType, VxeComponentIsVScrollbar, VxeComponentPermissionCodeType, VxeComponentPermissionMethod, VxeComponentPermissionInfo } from '../tool'

export type VxeUseFnUseSize = (props: {
  size?: VxeComponentSizeType;
}) => {
  computeSize: ComputedRef<VxeComponentSizeType>;
}

export const useSize: VxeUseFnUseSize

export type VxeUseVScrollbar = (props: {
  useScrollbar?: VxeComponentIsVScrollbar;
}) => {
  computeIsVScrollbar: ComputedRef<VxeComponentIsVScrollbar>;
}

export const useVScrollbar: VxeUseVScrollbar

export type VxeUsePermission = (props: {
  permissionCode?: VxeComponentPermissionCodeType
  permissionMethod?: VxeComponentPermissionMethod
}) => {
  computePermissionInfo: ComputedRef<VxeComponentPermissionInfo>;
}

export const usePermission: VxeUsePermission

/**
 * 通用方法
 */
export interface VxeGlobalUseFns {
  useSize: VxeUseFnUseSize
  useVScrollbar: VxeUseVScrollbar
  usePermission: VxeUsePermission
}
