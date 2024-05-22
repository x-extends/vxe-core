import { ComputedRef } from 'vue'
import { VxeComponentSizeType } from '../tool'

export function useSize(props: {
  size?: VxeComponentSizeType;
}): {
  computeSize: ComputedRef<VxeComponentSizeType>;
}
