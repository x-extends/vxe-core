import { ComputedRef } from 'vue'
import { VxeComponentSizeType } from '../tool'

export type VxeUseFnUseSize = (props: {
  size?: VxeComponentSizeType;
}) => {
  computeSize: ComputedRef<VxeComponentSizeType>;
}

export const useSize: VxeUseFnUseSize

/**
 * 全局剪贴板
 */
export interface VxeGlobalUseFns {
  useSize: VxeUseFnUseSize
}
