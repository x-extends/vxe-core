import { ComponentOptions } from 'vue'

export type VxeGlobalComponentMethod = (comp: ComponentOptions) => void
export type VxeGlobalGetComponentMethod = (name: string) => ComponentOptions | null

export interface VxeGlobalComponents {
  [key: string]: ComponentOptions
}
